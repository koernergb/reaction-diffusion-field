# RAVE sidecar (field → z → timbre)

Local WebSocket decoder for the backdrop control loop.

## Quick start (pretrained RAVE)

Model already downloaded (or re-fetch):

```bash
cd services/rave-sidecar
source .venv/bin/activate
# optional re-download:
# bash download_model.sh sol_ordinario_fast
python server.py --model models/sol_ordinario_fast.ts
```

In the Next app (`backdrop-only`): turn on **RAVE control**.
Status should show `connected · rave · |z|=…` (not `mock`).

Other public models: `nasa`, `percussion`, `vintage`, `VCTK`, `musicnet`, `isis`, …

```bash
bash download_model.sh nasa
python server.py --model models/nasa.ts
```

Catalog: https://acids-ircam.github.io/rave_models_download  
API: `https://play.forum.ircam.fr/rave-vst-api/get_model/<name>`

## If it still sounds like sines

You’re still in **mock** mode (no model / torch failed). Check the sidecar log for `mode=rave`.

## How audio works now

RAVE is driven by an **encoded seed loop** (in-distribution latents). The backdrop field only **modulates** that trajectory — it does not invent `z` from scratch (that was the drone/feedback).

```bash
python server.py --model models/sol_ordinario_fast.ts
# more field influence:
python server.py --model models/sol_ordinario_fast.ts --z-scale 4 --gain 5
```

## Protocol

Client → server:
```json
{ "type": "z", "z": [/* float × latentDim */], "t": 1234567.89 }
```

Server → client:
```json
{ "type": "hello", "mode": "mock"|"rave", "latentDim": 8, "sampleRate": 48000 }
{ "type": "status", "zNorm": 1.23, "mode": "rave" }
```

## Next: train field → z mapper

1. Record proxy pairs: field snapshots + RAVE `encode()` latents from seed audio.
2. Train a small CNN/MLP.
3. Replace the browser stub projection with trained weights.
