#!/usr/bin/env python3
"""WebSocket RAVE sidecar — pretrained decode with mock fallback."""

from __future__ import annotations

import argparse
import asyncio
import json
import math
import multiprocessing as mp
import queue
import threading
import time
from pathlib import Path
from typing import Optional, Protocol

import numpy as np
import websockets
from scipy.signal import lfilter

DEFAULT_LATENT_DIM = 16
DEFAULT_SAMPLE_RATE = 48000
BLOCK = 4096  # fewer callbacks → fewer underrun glitches
DEFAULT_MODEL = Path(__file__).resolve().parent / "models" / "sol_ordinario_fast.ts"


class BloomLowpass:
    """Dumb LPF: browser lfoSin → log cutoff. Fixed Q/wet. No shelf / free-run / skew."""

    FC_MIN = 600.0
    Q = 0.50
    WET = 0.90

    def __init__(self, sample_rate: int):
        self.sr = float(sample_rate)
        self.fc_max = min(20000.0, 0.42 * self.sr)
        self.last_fc = self.fc_max
        self.last_q = self.Q
        self.last_wet = self.WET
        self._lp_zi = np.zeros(2, dtype=np.float64)
        self._b = np.array([1.0, 0.0, 0.0], dtype=np.float64)
        self._a = np.array([1.0, 0.0, 0.0], dtype=np.float64)
        self._set_lpf(self.fc_max, self.Q)

    @classmethod
    def cutoff_hz(cls, lfo: float, sample_rate: float, fc_max: Optional[float] = None) -> float:
        """lfo ∈ [-1, 1] → log cutoff FC_MIN…fc_max. No skew."""
        sr = float(sample_rate)
        hi = float(fc_max if fc_max is not None else min(20000.0, 0.42 * sr))
        t = float(np.clip(0.5 + 0.5 * float(lfo), 0.0, 1.0))
        return float(cls.FC_MIN * ((hi / cls.FC_MIN) ** t))

    def _set_lpf(self, fc: float, q: float) -> None:
        fc = float(np.clip(fc, 20.0, 0.495 * self.sr))
        q = float(np.clip(q, 0.05, 20.0))
        self.last_fc = fc
        self.last_q = q
        w0 = 2.0 * math.pi * fc / self.sr
        cos_w0 = math.cos(w0)
        sin_w0 = math.sin(w0)
        alpha = sin_w0 / (2.0 * q)
        b0 = (1.0 - cos_w0) * 0.5
        b1 = 1.0 - cos_w0
        b2 = (1.0 - cos_w0) * 0.5
        a0 = 1.0 + alpha
        a1 = -2.0 * cos_w0
        a2 = 1.0 - alpha
        inv = 1.0 / a0
        self._b = np.array([b0 * inv, b1 * inv, b2 * inv], dtype=np.float64)
        self._a = np.array([1.0, a1 * inv, a2 * inv], dtype=np.float64)

    def process(self, x: np.ndarray, lfo: float) -> np.ndarray:
        fc = self.cutoff_hz(lfo, self.sr, self.fc_max)
        self._set_lpf(fc, self.Q)
        wet = self.WET
        self.last_wet = wet
        x64 = np.ascontiguousarray(x, dtype=np.float64)
        lp, self._lp_zi = lfilter(self._b, self._a, x64, zi=self._lp_zi)
        out = (1.0 - wet) * x64 + wet * lp
        return out.astype(np.float32)


class ControlState:
    """Browser control bus: mild field z + bloom LFO + cursor."""

    def __init__(self, dim: int, mix: float = 0.06):
        self.dim = dim
        self.mix = mix
        self.z = np.zeros(dim, dtype=np.float32)
        self.lfo = 0.0
        self.dt = 1.0
        self.f = 0.0
        self.k = 0.0
        self.cursor_x = 0.5
        self.cursor_y = 0.5
        self.cursor_vel = 0.0
        self.cursor_on = 0.0
        self.dt_mod_period = 5.0
        self.lock = threading.Lock()
        self.last_update = 0.0

    def apply(self, msg: dict) -> float:
        z_vals = msg.get("z") or []
        arr = np.asarray(z_vals, dtype=np.float32)
        if arr.shape[0] != self.dim:
            out = np.zeros(self.dim, dtype=np.float32)
            n = min(self.dim, arr.shape[0])
            out[:n] = arr[:n]
            arr = out
        arr = np.clip(arr, -1.5, 1.5)

        cursor = msg.get("cursor") or {}
        with self.lock:
            self.z = (1.0 - self.mix) * self.z + self.mix * arr
            if "lfo" in msg:
                self.lfo = float(np.clip(msg["lfo"], -1.0, 1.0))
            if "dt" in msg:
                self.dt = float(msg["dt"])
            if "dtModPeriod" in msg:
                self.dt_mod_period = float(max(0.05, msg["dtModPeriod"]))
            if "f" in msg:
                self.f = float(msg["f"])
            if "k" in msg:
                self.k = float(msg["k"])
            self.cursor_x = float(np.clip(cursor.get("x", self.cursor_x), 0.0, 1.0))
            self.cursor_y = float(np.clip(cursor.get("y", self.cursor_y), 0.0, 1.0))
            self.cursor_vel = float(np.clip(cursor.get("vel", 0.0), 0.0, 1.0))
            self.cursor_on = float(cursor.get("on", 0.0))
            self.last_update = time.time()
            return float(np.linalg.norm(self.z))

    def snapshot(self) -> dict:
        with self.lock:
            age = time.time() - self.last_update if self.last_update > 0 else 1e9
            # Cursor goes quiet when ctrl stalls — but NEVER zero the LFO here.
            # Zeroing it parked the filter at mid cutoff after the WS thread
            # got starved by the audio callback (looked like "stops after reload").
            stale = age > 0.4
            return {
                "z": self.z.copy(),
                "lfo": self.lfo,
                "dt": self.dt,
                "dtModPeriod": getattr(self, "dt_mod_period", 5.0),
                "f": self.f,
                "k": self.k,
                "cursor_x": self.cursor_x,
                "cursor_y": self.cursor_y,
                "cursor_vel": 0.0 if stale else self.cursor_vel,
                "cursor_on": 0.0 if stale else self.cursor_on,
                "ctrl_fresh": not stale,
            }


# Back-compat alias
LatentState = ControlState


class Decoder(Protocol):
    def render(self, ctrl: dict, n: int) -> np.ndarray: ...


class MockDecoder:
    def __init__(self, sample_rate: int, latent_dim: int):
        self.sr = sample_rate
        self.dim = latent_dim
        self.phase = np.zeros(max(1, latent_dim // 2), dtype=np.float64)

    def render(self, ctrl: dict, n: int) -> np.ndarray:
        z = ctrl.get("z") if isinstance(ctrl, dict) else ctrl
        if not isinstance(z, np.ndarray):
            z = np.zeros(self.dim, dtype=np.float32)
        lfo = float(ctrl.get("lfo", 0.0)) if isinstance(ctrl, dict) else 0.0
        vel = float(ctrl.get("cursor_vel", 0.0)) if isinstance(ctrl, dict) else 0.0
        freqs = 80.0 + (np.abs(z[0::2]) if len(z) >= 2 else np.abs(z)) * 600.0
        amps = np.clip(np.abs(z[1::2]) if len(z) >= 2 else np.abs(z), 0, 1)
        if len(amps) < len(self.phase):
            amps = np.pad(amps, (0, len(self.phase) - len(amps)))
        if len(freqs) < len(self.phase):
            freqs = np.pad(freqs, (0, len(self.phase) - len(freqs)), constant_values=110.0)
        freqs = freqs[: len(self.phase)] * (1.0 + 0.15 * lfo)
        amps = amps[: len(self.phase)] * (0.15 / max(1, len(self.phase))) * (1.0 + 0.8 * vel)

        t = np.arange(n, dtype=np.float64)
        out = np.zeros(n, dtype=np.float64)
        for i, (f, a) in enumerate(zip(freqs, amps)):
            step = 2 * math.pi * float(f) / self.sr
            ph = self.phase[i] + step * t
            out += a * np.sin(ph)
            self.phase[i] = (self.phase[i] + step * n) % (2 * math.pi)
        return np.tanh(out).astype(np.float32)


def _make_seed_audio(sr: int, seconds: float = 10.0):
    """Longer, evolving carrier so encode→loop is less obvious."""
    import torch

    n = int(sr * seconds)
    t = torch.arange(n, dtype=torch.float32) / sr
    f0 = 90.0 + 40.0 * torch.sin(2 * math.pi * 0.07 * t)
    x = (
        0.30 * torch.sin(2 * math.pi * f0 * t)
        + 0.20 * torch.sin(2 * math.pi * (f0 * 1.5) * t)
        + 0.15 * torch.sin(2 * math.pi * (f0 * 2.0) * t + 0.5 * torch.sin(2 * math.pi * 0.13 * t))
        + 0.12 * torch.sin(2 * math.pi * (f0 * 3.0) * t)
        + 0.10 * torch.randn(n) * (0.4 + 0.6 * (0.5 + 0.5 * torch.sin(2 * math.pi * 0.11 * t)))
    )
    env = (
        0.45
        + 0.25 * torch.sin(2 * math.pi * 0.23 * t)
        + 0.20 * torch.sin(2 * math.pi * 0.09 * t + 1.2)
        + 0.10 * torch.sin(2 * math.pi * 0.47 * t)
    )
    x = (x * env).unsqueeze(0).unsqueeze(0)
    peak = x.abs().max().clamp_min(1e-3)
    return x / peak * 0.85


def try_load_rave(path: Optional[str], quiet: bool = False):
    if not path:
        return None, None, None
    try:
        import torch
    except ImportError:
        if not quiet:
            print("[sidecar] torch not installed — staying in mock mode")
        return None, None, None
    p = Path(path)
    if not p.exists():
        if not quiet:
            print(f"[sidecar] model not found: {p} — mock mode")
        return None, None, None
    try:
        model = torch.jit.load(str(p), map_location="cpu")
        model.eval()
        params = model.decode_params.detach().cpu().tolist()
        latent_dim = int(params[0])
        hop = int(params[1])
        if not quiet:
            print(f"[sidecar] loaded RAVE model: {p.name}  latent={latent_dim} hop={hop}")
        return model, latent_dim, hop
    except Exception as e:  # noqa: BLE001
        if not quiet:
            print(f"[sidecar] failed to load RAVE ({e}) — mock mode")
        return None, None, None



def _decode_worker_main(model_path: str, job_q: "mp.Queue", result_q: "mp.Queue") -> None:
    """Child process: load+decode so torch never contends with the audio GIL."""
    import numpy as np
    import torch

    try:
        torch.set_num_threads(1)
    except Exception:
        pass
    while True:
        job = job_q.get()
        if job is None:
            break
        job_id, traj = job
        try:
            model = torch.jit.load(model_path, map_location="cpu")
            model.eval()
            with torch.no_grad():
                y = model.decode(torch.from_numpy(np.ascontiguousarray(traj)))
            pcm = y.squeeze().detach().cpu().numpy().astype(np.float32)
            del model
            result_q.put((job_id, pcm, None))
        except Exception as e:  # noqa: BLE001
            result_q.put((job_id, None, str(e)))


class RaveDecoder:
    """
    Same control feel as the seed+drift live walk you liked, but this streaming
    export collapses after ~1s of hop-by-hop decode. So we:

    - encode the 10s seed once
    - decode the full latent traj on a *fresh* model instance
    - play hop-aligned with the same peak-norm + LP as the live path
    - skip near-silent hops (model output is ~65% dead air) without densifying
      into one glued loop — event order stays, gaps go away
    - keep Brownian drift + field rate/timbre; re-decode drifted traj every
      few seconds on a fresh model so it doesn't hard-loop one PCM buffer

    (Same model cannot decode twice — must reload.)
    """

    REGEN_EVERY_S = 4.0
    CROSSFADE_S = 2.5  # longer morph hides any remaining hiccups
    LIVE_HOP_RMS = 0.01
    MIN_BUFFER_S = 1.8  # reject tiny regens that click/gap
    # Pre-normalization energy floor — length-only checks let near-silent beds through
    MIN_PREP_RMS = 0.06

    def __init__(
        self,
        model,
        model_path: str,
        latent_dim: int,
        hop: int = 512,
        sample_rate: int = 48000,
        z_scale: float = 2.5,
        output_gain: float = 4.0,
    ):
        import torch

        try:
            torch.set_num_threads(1)
        except Exception:  # noqa: BLE001
            pass

        self.torch = torch
        self.model_path = model_path
        self.dim = latent_dim
        self.hop = hop
        self.sample_rate = sample_rate
        self.z_scale = z_scale
        self.output_gain = output_gain
        self.lock = threading.Lock()
        self._ctrl = np.zeros(latent_dim, dtype=np.float32)
        self._lfo = 0.0
        self._lfo_tone = 0.0  # exact browser lfoSin used by the LPF (no free-run)
        self._cursor_x = 0.5
        self._cursor_y = 0.5
        self._cursor_x_prev = 0.5
        self._cursor_y_prev = 0.5
        self._cursor_vel = 0.0
        self._cursor_on = 0.0
        self._amp = 0.7
        self._cursor_env = 0.0
        # Soft XY-pad offset in latent (position) + motion nudge into Brownian
        self._cursor_z = np.zeros(latent_dim, dtype=np.float32)
        self._phase_frac = 0.0
        self._drift = np.zeros(latent_dim, dtype=np.float32)
        self._rng = np.random.default_rng(7)
        self._lpf = BloomLowpass(sample_rate)
        self._pcm = np.zeros(hop, dtype=np.float32)
        self._pcm_from = self._pcm
        self._pcm_to = self._pcm
        self._n_samples = hop
        self._xfade = 1.0
        self._xfading = False
        self._live = np.array([0], dtype=np.int64)
        self._stop = False
        self._job_id = 0
        self._ctx = mp.get_context("spawn")
        self._job_q: mp.Queue = self._ctx.Queue(maxsize=2)
        self._result_q: mp.Queue = self._ctx.Queue(maxsize=2)
        self._worker = self._ctx.Process(
            target=_decode_worker_main,
            args=(model_path, self._job_q, self._result_q),
            daemon=True,
        )
        self._worker.start()
        print("[sidecar] decode worker process started (isolates torch from audio GIL)")

        with torch.no_grad():
            seed = _make_seed_audio(sample_rate, seconds=10.0)
            # One-time encode in-process before audio starts
            z = model.encode(seed)
            self._traj = z.detach().cpu().numpy().astype(np.float32)
            self._traj_std = np.maximum(np.std(self._traj, axis=-1, keepdims=True), 1e-2)
        self._n_frames = int(self._traj.shape[-1])
        del model

        dense = self._prepare_pcm(self._decode_traj(self._traj), label="seed")
        if dense is None:
            dense = np.zeros(int(self.sample_rate * 2), dtype=np.float32)
        self._pcm = dense
        self._pcm_from = dense
        self._pcm_to = dense
        self._n_samples = len(dense)
        self._xfade = 1.0
        self._xfading = False
        self._pending_pcm = None  # prefetch ready buffer
        self._regen_fail_streak = 0

        self._regen_thread = threading.Thread(target=self._regen_loop, daemon=True)
        self._regen_thread.start()

    def close(self) -> None:
        self._stop = True
        try:
            self._job_q.put_nowait(None)
        except Exception:  # noqa: BLE001
            pass
        if getattr(self, "_worker", None) is not None and self._worker.is_alive():
            self._worker.join(timeout=2.0)

    def _decode_traj(self, traj_np: np.ndarray) -> np.ndarray:
        """Decode in the worker process — parent stays responsive for audio."""
        self._job_id += 1
        job_id = self._job_id
        traj = np.ascontiguousarray(traj_np, dtype=np.float32)
        self._job_q.put((job_id, traj))
        while True:
            rid, pcm, err = self._result_q.get(timeout=90.0)
            if rid != job_id:
                # Stale — keep waiting for ours
                continue
            if err or pcm is None:
                print(f"[sidecar] decode worker error: {err}")
                return np.zeros(self.hop, dtype=np.float32)
            return pcm

    def _live_hop_indices(self, pcm: np.ndarray) -> np.ndarray:
        n = max(1, len(pcm) // self.hop)
        usable = pcm[: n * self.hop].reshape(n, self.hop)
        rms = np.sqrt(np.mean(usable * usable, axis=1))
        live = np.flatnonzero(rms >= self.LIVE_HOP_RMS)
        if live.size == 0:
            keep = max(1, min(n, 8))
            live = np.sort(np.argsort(rms)[-keep:])
        return live.astype(np.int64)

    def _prepare_pcm(self, pcm: np.ndarray, label: str):
        live = self._live_hop_indices(pcm)
        n_hops = max(1, len(pcm) // self.hop)
        chunks = [pcm[int(i) * self.hop : (int(i) + 1) * self.hop] for i in live]
        dense = np.concatenate(chunks).astype(np.float32) if len(chunks) else pcm.copy()
        if len(dense) < int(self.MIN_BUFFER_S * self.sample_rate):
            print(
                f"[sidecar] {label} too short ({len(dense) / self.sample_rate:.2f}s) — skip"
            )
            return None
        rms = float(np.sqrt(np.mean(dense * dense)) + 1e-8)
        # Near-silent densified beds used to pass the length check (rms~0.02) and
        # kill audible filter motion after a few regenerations.
        if rms < self.MIN_PREP_RMS and not label.startswith("seed"):
            print(
                f"[sidecar] {label} too quiet (rms={rms:.3f} < {self.MIN_PREP_RMS}) — skip"
            )
            return None
        dense = np.clip(dense / rms * 0.20, -0.95, 0.95).astype(np.float32)
        self._live = live
        print(
            f"[sidecar] {label} pcm={len(pcm)}→{len(dense)} rms={rms:.3f} "
            f"live_hops={len(live)}/{n_hops} "
            f"(~{len(dense) / self.sample_rate:.1f}s audible)"
        )
        return dense

    def _regen_backoff(self, reason: str) -> None:
        """Pull drift/cursor pad back toward the seed so the next decode can recover."""
        with self.lock:
            self._regen_fail_streak += 1
            streak = self._regen_fail_streak
            scale = 0.50 if streak < 3 else 0.20
            self._drift = (self._drift * scale).astype(np.float32)
            self._cursor_z = (self._cursor_z * scale).astype(np.float32)
            dnorm = float(np.linalg.norm(self._drift))
            cnorm = float(np.linalg.norm(self._cursor_z))
        print(
            f"[sidecar] regen backoff ({reason}) streak={streak} "
            f"drift|={dnorm:.2f} cursor_z|={cnorm:.2f}"
        )

    def _regen_success(self) -> None:
        self._regen_fail_streak = 0

    def _resample(self, pcm: np.ndarray, n: int) -> np.ndarray:
        """Linear resample pcm to length n (for mid-fade baking)."""
        if len(pcm) == n:
            return pcm.astype(np.float32, copy=False)
        if n < 2 or len(pcm) < 2:
            return np.zeros(max(2, n), dtype=np.float32)
        pos = np.linspace(0.0, len(pcm), n, endpoint=False)
        i0 = np.floor(pos).astype(np.int64) % len(pcm)
        f = (pos - np.floor(pos)).astype(np.float32)
        i1 = (i0 + 1) % len(pcm)
        return ((1.0 - f) * pcm[i0] + f * pcm[i1]).astype(np.float32)

    def _begin_crossfade(self, new_pcm: np.ndarray) -> None:
        """Start equal-power morph from current sound to new drifted buffer."""
        if self._xfading and 0.0 < self._xfade < 1.0:
            x = float(self._xfade)
            wa = math.cos(0.5 * math.pi * x)
            wb = math.sin(0.5 * math.pi * x)
            a = self._pcm_from
            b = self._resample(self._pcm_to, len(a))
            self._pcm_from = (wa * a + wb * b).astype(np.float32)
        else:
            self._pcm_from = self._pcm
        self._pcm_to = new_pcm
        # Keep phase reference on the outgoing buffer during the morph
        self._n_samples = max(2, len(self._pcm_from))
        self._xfade = 0.0
        self._xfading = True
        # no print here — regen loop is chatty enough

    def _read_frac(self, pcm: np.ndarray, frac: float, n: int, rate: float) -> np.ndarray:
        """Linear-interpolated read of n samples starting at fractional playhead."""
        length = max(2, len(pcm))
        # Same perceived speed across buffers of different lengths
        step = rate * (length / max(2, self._n_samples))
        pos0 = (frac % 1.0) * length
        pos = (pos0 + step * np.arange(n, dtype=np.float64)) % length
        i0 = np.floor(pos).astype(np.int64)
        f = (pos - i0).astype(np.float32)
        i1 = (i0 + 1) % length
        return ((1.0 - f) * pcm[i0] + f * pcm[i1]).astype(np.float32)

    def _cursor_latent_target(self) -> np.ndarray:
        """Map normalized cursor XY (+ on) into a mild multi-dim latent pad."""
        z = np.zeros(self.dim, dtype=np.float32)
        if self._cursor_on < 0.5:
            return z
        cx = float(np.clip(2.0 * (self._cursor_x - 0.5), -1.0, 1.0))
        cy = float(np.clip(2.0 * (self._cursor_y - 0.5), -1.0, 1.0))
        # Spread XY across dims so motion isn't a single-axis sweep
        basis = [
            cx,
            cy,
            0.7 * cx + 0.3 * cy,
            0.3 * cx - 0.7 * cy,
            cx * cy,
            0.5 * (cy * cy - cx * cx),
            0.6 * cy,
            -0.6 * cx,
        ]
        for i in range(self.dim):
            z[i] = float(basis[i % len(basis)])
        return np.clip(z, -1.0, 1.0).astype(np.float32)

    def _current_traj(self) -> np.ndarray:
        """Brownian + mild field + cursor pad. No LFO axis / rate scrub."""
        std = self._traj_std  # (1, D, 1)
        drift = self._drift.reshape(1, self.dim, 1)
        ctrl = self._ctrl.reshape(1, self.dim, 1)
        cursor = self._cursor_z.reshape(1, self.dim, 1)
        return (
            self._traj
            + drift * std * 0.25
            + ctrl * (0.20 * self.z_scale) * std
            + cursor * (0.35 * self.z_scale) * std
        ).astype(np.float32)

    def _regen_loop(self) -> None:
        while not self._stop:
            t0 = time.time()
            with self.lock:
                turb = float(np.clip(0.5 + 0.5 * self._ctrl[min(1, self.dim - 1)], 0.0, 1.0))
                lfo01 = 0.5 + 0.5 * float(self._lfo)
                # Slightly faster regenerations while the cursor is gesturing
                interval = self.REGEN_EVERY_S * (0.65 if self._cursor_vel > 0.12 else 1.0)
                hops = max(1, int(interval * self.sample_rate / self.hop))
                for _ in range(hops):
                    noise = self._rng.normal(0.0, 1.0, size=self.dim).astype(np.float32)
                    drift_rate = (0.008 + 0.020 * turb) * (0.85 + 0.35 * lfo01)
                    self._drift = 0.997 * self._drift + drift_rate * noise
                self._drift = np.clip(self._drift, -1.2, 1.2)
                traj = self._current_traj()
                cz = float(np.linalg.norm(self._cursor_z))
                # Milder cursor pad when we're already in a fail streak
                if self._regen_fail_streak > 0:
                    traj = (
                        self._traj
                        + self._drift.reshape(1, self.dim, 1) * self._traj_std * 0.25
                        + self._ctrl.reshape(1, self.dim, 1)
                        * (0.20 * self.z_scale)
                        * self._traj_std
                        + self._cursor_z.reshape(1, self.dim, 1)
                        * (0.12 * self.z_scale)
                        * self._traj_std
                    ).astype(np.float32)

            try:
                # Heavy work in worker process — does not block audio GIL
                pcm = self._decode_traj(traj)
                raw_rms = float(np.sqrt(np.mean(pcm * pcm)))
                if raw_rms < 1e-4:
                    self._regen_backoff("decode silent")
                    elapsed = time.time() - t0
                    time.sleep(max(0.2, self.REGEN_EVERY_S - elapsed))
                    continue
                dense = self._prepare_pcm(
                    pcm,
                    label=(
                        f"regen drift|={float(np.linalg.norm(self._drift)):.2f} "
                        f"cursor_z|={cz:.2f}"
                    ),
                )
                if dense is None:
                    self._regen_backoff("prep reject")
                    elapsed = time.time() - t0
                    time.sleep(max(0.2, self.REGEN_EVERY_S - elapsed))
                    continue

                self._regen_success()

                # Wait until current morph finishes, then swap (or use pending)
                while not self._stop:
                    with self.lock:
                        busy = self._xfading and self._xfade < 0.98
                        if not busy:
                            self._begin_crossfade(dense)
                            dense = None
                            break
                    time.sleep(0.05)
                if dense is not None:
                    # Still busy — keep newest pending for next free slot
                    with self.lock:
                        self._pending_pcm = dense
            except Exception as e:  # noqa: BLE001
                print(f"[sidecar] regen failed: {e}")
                self._regen_backoff(f"exception: {e}")

            # If a pending buffer is waiting and we're free, apply it
            with self.lock:
                if (
                    self._pending_pcm is not None
                    and not (self._xfading and self._xfade < 0.98)
                ):
                    self._begin_crossfade(self._pending_pcm)
                    self._pending_pcm = None

            elapsed = time.time() - t0
            with self.lock:
                interval = self.REGEN_EVERY_S * (0.65 if self._cursor_vel > 0.12 else 1.0)
            time.sleep(max(0.2, interval - elapsed))

    def _fill(self, n: int) -> np.ndarray:
        """Continuous playback; cursor → amp + latent; LFO → drift size + LPF cutoff."""
        field_e = float(np.clip(0.5 + 0.5 * self._ctrl[0], 0.0, 1.0))
        vel = float(self._cursor_vel)

        attack = 1.0 - math.exp(-n / max(1.0, 0.08 * self.sample_rate))
        release = 1.0 - math.exp(-n / max(1.0, 0.95 * self.sample_rate))
        if vel > self._cursor_env:
            self._cursor_env += (vel - self._cursor_env) * attack
        else:
            self._cursor_env += (vel - self._cursor_env) * release
        env = float(np.clip(self._cursor_env, 0.0, 1.0))

        rate = 0.88 + 0.08 * field_e
        length = max(2, self._n_samples)
        frac0 = float(self._phase_frac)

        if self._xfading and self._xfade < 1.0:
            a = self._read_frac(self._pcm_from, frac0, n, rate)
            b = self._read_frac(self._pcm_to, frac0, n, rate)
            x0 = float(self._xfade)
            dx = n / max(1.0, self.CROSSFADE_S * self.sample_rate)
            x1 = min(1.0, x0 + dx)
            xs = np.linspace(x0, x1, n, dtype=np.float64)
            # Equal-power with a small constant-sum floor to avoid mid-fade dips
            wa = np.cos(0.5 * math.pi * xs).astype(np.float32)
            wb = np.sin(0.5 * math.pi * xs).astype(np.float32)
            s = (0.15 + 0.85 * wa) * a + (0.15 + 0.85 * wb) * b
            s *= (1.0 / 1.15)
            self._xfade = x1
            if x1 >= 1.0:
                self._xfading = False
                self._pcm = self._pcm_to
                self._pcm_from = self._pcm_to
                self._n_samples = max(2, len(self._pcm))
        else:
            s = self._read_frac(self._pcm, frac0, n, rate)

        self._phase_frac = (frac0 + (rate * n) / length) % 1.0

        s = self._lpf.process(s, float(self._lfo_tone))

        amp_mod = 0.52 + 0.48 * env
        target_amp = (0.70 + 0.08 * field_e) * (0.55 * self.output_gain) * amp_mod
        self._amp = 0.88 * self._amp + 0.12 * target_amp
        return np.clip(s * float(self._amp), -0.95, 0.95).astype(np.float32)

    def render(self, ctrl: dict, n: int) -> np.ndarray:
        with self.lock:
            z = ctrl.get("z")
            if isinstance(z, np.ndarray):
                c = np.zeros(self.dim, dtype=np.float32)
                k = min(self.dim, z.shape[0])
                c[:k] = np.clip(z[:k], -1.0, 1.0)
                self._ctrl = 0.88 * self._ctrl + 0.12 * c

            if "lfo" in ctrl:
                raw = float(np.clip(float(ctrl["lfo"]), -1.0, 1.0))
                self._lfo = 0.35 * self._lfo + 0.65 * raw  # drift / regen only
                # Filter uses browser bloom directly — hold last value if key missing
                self._lfo_tone = raw
            self._cursor_x = float(ctrl.get("cursor_x", self._cursor_x))
            self._cursor_y = float(ctrl.get("cursor_y", self._cursor_y))
            self._cursor_vel = 0.65 * self._cursor_vel + 0.35 * float(ctrl.get("cursor_vel", 0.0))
            self._cursor_on = float(ctrl.get("cursor_on", 0.0))

            # Track pad + gesture continuously; baked into traj on next regen
            dx = self._cursor_x - self._cursor_x_prev
            dy = self._cursor_y - self._cursor_y_prev
            self._cursor_x_prev = self._cursor_x
            self._cursor_y_prev = self._cursor_y
            target = self._cursor_latent_target()
            blend = 0.18 if self._cursor_on > 0.5 else 0.04
            self._cursor_z = (1.0 - blend) * self._cursor_z + blend * target
            if self._cursor_on > 0.5 and self._cursor_vel > 0.02:
                push = np.array(
                    [
                        dx,
                        dy,
                        0.6 * dx + 0.4 * dy,
                        0.4 * dx - 0.6 * dy,
                        dx * dy * 4.0,
                        dy - dx,
                        0.5 * dy,
                        -0.5 * dx,
                    ][: self.dim],
                    dtype=np.float32,
                )
                if push.shape[0] < self.dim:
                    push = np.pad(push, (0, self.dim - push.shape[0]))
                nrm = float(np.linalg.norm(push))
                if nrm > 1e-6:
                    self._drift = np.clip(
                        self._drift + (push / nrm) * (0.012 * self._cursor_vel),
                        -1.6,
                        1.6,
                    )

            return self._fill(n)

    @property
    def last_lpf_hz(self) -> float:
        return float(getattr(self._lpf, "last_fc", 0.0))

    @property
    def lpf_debug(self) -> dict:
        return {
            "lpfHz": self.last_lpf_hz,
            "lpfMin": float(BloomLowpass.FC_MIN),
            "lpfMax": float(self._lpf.fc_max),
            "lpfWet": float(BloomLowpass.WET),
            "lpfQ": float(BloomLowpass.Q),
            "lfo": float(self._lfo_tone),
            "lfoIn": float(self._lfo_tone),
        }


class AudioEngine:
    def __init__(self, state: ControlState, decoder: Decoder, sample_rate: int, label: str):
        self.state = state
        self.decoder = decoder
        self.sr = sample_rate
        self.label = label
        self._stream: Optional[object] = None

    def start(self) -> bool:
        try:
            import sounddevice as sd
        except ImportError:
            print("[sidecar] sounddevice not available — status-only mode")
            return False

        def callback(outdata, frames, time_info, status):  # noqa: ARG001
            if status:
                print(f"[sidecar] audio status: {status}")
            ctrl = self.state.snapshot()
            outdata[:, 0] = self.decoder.render(ctrl, frames)

        try:
            self._stream = sd.OutputStream(
                samplerate=self.sr,
                channels=1,
                blocksize=BLOCK,
                dtype="float32",
                latency="high",
                callback=callback,
            )
            self._stream.start()
            print(f"[sidecar] audio out @ {self.sr} Hz ({self.label})")
            return True
        except Exception as e:  # noqa: BLE001
            print(f"[sidecar] audio init failed ({e}) — continuing without audio")
            self._stream = None
            return False

    def stop(self) -> None:
        if self._stream is not None:
            self._stream.stop()
            self._stream.close()
            self._stream = None


async def handler(websocket, state: ControlState, mode: str, sample_rate: int, decoder: Optional[object] = None):
    hello = {
        "type": "hello",
        "mode": mode,
        "latentDim": state.dim,
        "sampleRate": sample_rate,
        "lpfMin": BloomLowpass.FC_MIN,
        "lpfMax": min(20000.0, 0.42 * sample_rate),
        "lpfWet": BloomLowpass.WET,
        "lpfQ": BloomLowpass.Q,
    }
    await websocket.send(json.dumps(hello))
    print("[sidecar] client connected")
    try:
        async for raw in websocket:
            try:
                msg = json.loads(raw)
            except json.JSONDecodeError:
                continue
            mtype = msg.get("type")
            # Accept legacy "z" and new "ctrl"
            if mtype not in ("z", "ctrl"):
                continue
            if mtype == "z" and "lfo" not in msg:
                msg = {"z": msg.get("z") or []}
            z_norm = state.apply(msg)
            dbg = {}
            if decoder is not None and hasattr(decoder, "lpf_debug"):
                try:
                    dbg = decoder.lpf_debug  # type: ignore[attr-defined]
                except Exception:  # noqa: BLE001
                    dbg = {}
            lfo_applied = float(dbg.get("lfo", state.lfo))
            lpf_hz = float(
                dbg.get(
                    "lpfHz",
                    BloomLowpass.cutoff_hz(lfo_applied, sample_rate),
                )
            )
            await websocket.send(
                json.dumps(
                    {
                        "type": "status",
                        "zNorm": z_norm,
                        "mode": mode,
                        "lfo": lfo_applied,
                        "lfoIn": float(state.lfo),
                        "cursorVel": state.cursor_vel,
                        "lpfHz": lpf_hz,
                        "lpfMin": float(dbg.get("lpfMin", BloomLowpass.FC_MIN)),
                        "lpfMax": float(dbg.get("lpfMax", min(20000.0, 0.42 * sample_rate))),
                        "lpfWet": float(dbg.get("lpfWet", BloomLowpass.WET)),
                        "lpfQ": float(dbg.get("lpfQ", BloomLowpass.Q)),
                    }
                )
            )
    finally:
        print("[sidecar] client disconnected")


async def main_async(
    host: str,
    port: int,
    latent_dim: int,
    sample_rate: int,
    model_path: Optional[str],
    no_audio: bool,
    z_scale: float,
    output_gain: float,
):
    rave, rave_dim, hop = try_load_rave(model_path)
    if rave is not None and rave_dim is not None and model_path:
        mode = "rave"
        dim = rave_dim
        decoder: Decoder = RaveDecoder(
            rave,
            model_path=model_path,
            latent_dim=dim,
            hop=hop or 512,
            sample_rate=sample_rate,
            z_scale=z_scale,
            output_gain=output_gain,
        )
        label = "RAVE cursor→latent + bloom LPF"
    else:
        mode = "mock"
        dim = latent_dim
        decoder = MockDecoder(sample_rate, dim)
        label = "mock decoder"

    state = ControlState(dim)
    engine = AudioEngine(state, decoder, sample_rate, label)

    print(f"[sidecar] listening on ws://{host}:{port}  mode={mode}  dim={dim}")

    async def _handler(ws):
        await handler(ws, state, mode, sample_rate, decoder)

    async with websockets.serve(_handler, host, port):
        if not no_audio:
            await asyncio.get_event_loop().run_in_executor(None, engine.start)
        else:
            print("[sidecar] --no-audio: status-only mode")
        await asyncio.Future()


def main():
    parser = argparse.ArgumentParser(description="RAVE / mock latent sidecar")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--dim", type=int, default=DEFAULT_LATENT_DIM)
    parser.add_argument("--sr", type=int, default=DEFAULT_SAMPLE_RATE)
    parser.add_argument(
        "--model",
        default=str(DEFAULT_MODEL) if DEFAULT_MODEL.exists() else None,
    )
    parser.add_argument("--no-audio", action="store_true")
    parser.add_argument("--z-scale", type=float, default=2.5)
    parser.add_argument("--gain", type=float, default=4.0)
    args = parser.parse_args()

    try:
        asyncio.run(
            main_async(
                args.host,
                args.port,
                args.dim,
                args.sr,
                args.model,
                args.no_audio,
                args.z_scale,
                args.gain,
            )
        )
    except KeyboardInterrupt:
        print("\n[sidecar] bye")


if __name__ == "__main__":
    mp.freeze_support()
    main()
