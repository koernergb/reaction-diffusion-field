// src/components/BackdropControls.tsx
"use client";

import React, { useState } from "react";
import { useUiStore } from "@/lib/uiStore";

const BackdropControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const {
    showBackdrop,
    reducedMotion,
    reactiveTouch,
    turing,
    sonificationEnabled,
    setShowBackdrop,
    setReducedMotion,
    setReactiveTouch,
    setTuringConfig,
    setSonificationEnabled,
  } = useUiStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-4 sm:right-4 pointer-events-none">
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 rounded-full bg-emerald-900/90 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-mono text-emerald-100 hover:bg-emerald-800 transition-colors pointer-events-auto shadow-lg shadow-black/40 ring-1 ring-emerald-400/30"
      >
        {isOpen ? "⌃ Settings" : "⌄ Settings"}
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-[calc(100vw-2rem)] sm:w-72 max-w-sm rounded-lg border border-emerald-400/30 bg-black/90 text-[10px] sm:text-xs font-mono text-emerald-100 backdrop-blur-sm flex flex-col max-h-[80vh] pointer-events-auto">
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto flex-1 pointer-events-auto">
          {/* Header */}
          <div className="font-semibold text-emerald-300">Backdrop Settings</div>

          {/* Show/Hide Toggle */}
          <div className="flex items-center justify-between">
            <span>Show Animation</span>
            <button
              onClick={() => setShowBackdrop(!showBackdrop)}
              className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                showBackdrop
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              {showBackdrop ? "ON" : "OFF"}
            </button>
          </div>

          {/* Sonification Toggle */}
          <div className="flex items-center justify-between">
            <span>Enable Sonification</span>
            <button
              onClick={() => setSonificationEnabled(!sonificationEnabled)}
              className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                sonificationEnabled
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              {sonificationEnabled ? "ON" : "OFF"}
            </button>
          </div>

          {/* Color Toggle */}
          <div className="flex items-center justify-between">
            <span>Enable Color</span>
            <button
              onClick={() => setTuringConfig({ enableColor: !(turing.enableColor ?? false) })}
              className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                turing.enableColor
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              {turing.enableColor ? "ON" : "OFF"}
            </button>
          </div>

          <hr className="border-emerald-400/20" />

          {/* Turing Parameters */}
          <div className="space-y-4 pr-2">
              {/* Simulation */}
            <div className="space-y-3">
                <div className="font-semibold text-emerald-300">Simulation</div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Grid Size</span>
                  <span className="text-emerald-300">{turing.gridSize ?? 1024}</span>
                </div>
                <select
                  value={turing.gridSize ?? 1024}
                  onChange={(e) => setTuringConfig({ gridSize: parseInt(e.target.value) })}
                  className="w-full bg-slate-800 border border-emerald-400/20 rounded px-2 py-1 text-emerald-100"
                >
                  <option value="512">512 (Fast)</option>
                  <option value="1024">1024 (Balanced)</option>
                  <option value="2048">2048 (High Quality)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                    <span>Steps/Frame</span>
                    <span className="text-emerald-300">{turing.stepsPerFrame ?? 10}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={turing.stepsPerFrame ?? 10}
                    onChange={(e) => setTuringConfig({ stepsPerFrame: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>

              <hr className="border-emerald-400/20" />

              {/* Display Options */}
              <div className="space-y-3">
                <div className="font-semibold text-emerald-300">Display</div>

                <div className="flex items-center justify-between">
                  <span>Show Height</span>
                  <button
                    onClick={() => setTuringConfig({ showHeight: !(turing.showHeight ?? false) })}
                    className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                      turing.showHeight
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {turing.showHeight ? "ON" : "OFF"}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Show Bands Only</span>
                  <button
                    onClick={() => setTuringConfig({ showBandsOnly: !(turing.showBandsOnly ?? false) })}
                    className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                      turing.showBandsOnly
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {turing.showBandsOnly ? "ON" : "OFF"}
                  </button>
                </div>
              </div>

              <hr className="border-emerald-400/20" />

              {/* Gray-Scott */}
              <div className="space-y-3">
                <div className="font-semibold text-emerald-300">Gray-Scott</div>

              <div>
                <div className="flex justify-between mb-1">
                    <span>feed f</span>
                    <span className="text-emerald-300">{(turing.f ?? 0.037).toFixed(4)}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.08"
                  step="0.001"
                    value={turing.f ?? 0.037}
                    onChange={(e) => setTuringConfig({ f: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                    <span>kill k</span>
                    <span className="text-emerald-300">{(turing.k ?? 0.065).toFixed(4)}</span>
                </div>
                <input
                  type="range"
                  min="0.02"
                  max="0.10"
                  step="0.001"
                    value={turing.k ?? 0.065}
                    onChange={(e) => setTuringConfig({ k: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Du</span>
                    <span className="text-emerald-300">{(turing.Du ?? 0.16).toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.08"
                  max="0.25"
                  step="0.01"
                    value={turing.Du ?? 0.16}
                    onChange={(e) => setTuringConfig({ Du: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Dv</span>
                    <span className="text-emerald-300">{(turing.Dv ?? 0.08).toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.04"
                  max="0.15"
                  step="0.01"
                    value={turing.Dv ?? 0.08}
                    onChange={(e) => setTuringConfig({ Dv: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                    <span>Touch Gain</span>
                    <span className="text-emerald-300">{(turing.touchGain ?? 0.65).toFixed(2)}</span>
                </div>
                <input
                  type="range"
                    min="0"
                    max="1.5"
                    step="0.01"
                    value={turing.touchGain ?? 0.65}
                    onChange={(e) => setTuringConfig({ touchGain: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                    <span>Touch Radius</span>
                    <span className="text-emerald-300">{(turing.touchRadius ?? 0.03).toFixed(3)}</span>
                </div>
                <input
                  type="range"
                    min="0.005"
                    max="0.15"
                    step="0.001"
                    value={turing.touchRadius ?? 0.03}
                    onChange={(e) => setTuringConfig({ touchRadius: parseFloat(e.target.value) })}
                  className="w-full"
                />
                </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>dt Mod Period</span>
                  <span className="text-emerald-300">{(turing.dtModPeriod ?? 5.0).toFixed(1)}s</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={turing.dtModPeriod ?? 5.0}
                  onChange={(e) => setTuringConfig({ dtModPeriod: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>
              </div>

              <hr className="border-emerald-400/20" />

              {/* Height Processing */}
              <div className="space-y-3">
                <div className="font-semibold text-emerald-300">Height Processing</div>

              <div>
                <div className="flex justify-between mb-1">
                    <span>Blur Radius</span>
                    <span className="text-emerald-300">{(turing.blurRadius ?? 1.0).toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                    max="2.5"
                    step="0.1"
                    value={turing.blurRadius ?? 1.0}
                    onChange={(e) => setTuringConfig({ blurRadius: parseFloat(e.target.value) })}
                  className="w-full"
                />
                </div>
              </div>

              <hr className="border-emerald-400/20" />

              {/* Bands */}
              <div className="space-y-3">
                <div className="font-semibold text-emerald-300">Bands</div>

              <div>
                <div className="flex justify-between mb-1">
                    <span>Frequency</span>
                    <span className="text-emerald-300">{(turing.freq ?? 8.0).toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                    max="16"
                    step="0.5"
                    value={turing.freq ?? 8.0}
                    onChange={(e) => setTuringConfig({ freq: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                    <span>Thickness</span>
                    <span className="text-emerald-300">{(turing.bandThickness ?? 0.65).toFixed(2)}</span>
                </div>
                <input
                  type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={turing.bandThickness ?? 0.65}
                    onChange={(e) => setTuringConfig({ bandThickness: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Relief</span>
                  <span className="text-emerald-300">{(turing.relief ?? 0.8).toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={turing.relief ?? 0.8}
                  onChange={(e) => setTuringConfig({ relief: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                    <span>Exposure</span>
                    <span className="text-emerald-300">{(turing.exposure ?? 1.15).toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.05"
                    value={turing.exposure ?? 1.15}
                    onChange={(e) => setTuringConfig({ exposure: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>

              <hr className="border-emerald-400/20" />

              {/* Domain Warp */}
              <div className="space-y-3">
                <div className="font-semibold text-emerald-300">Domain Warp</div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Amplitude</span>
                    <span className="text-emerald-300">{(turing.warpAmp ?? 0.04).toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                    max="0.2"
                  step="0.01"
                    value={turing.warpAmp ?? 0.04}
                  onChange={(e) => setTuringConfig({ warpAmp: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Scale</span>
                    <span className="text-emerald-300">{(turing.warpScale ?? 3.0).toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.1"
                    value={turing.warpScale ?? 3.0}
                    onChange={(e) => setTuringConfig({ warpScale: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Speed</span>
                    <span className="text-emerald-300">{(turing.warpSpeed ?? 0.06).toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.2"
                    step="0.01"
                    value={turing.warpSpeed ?? 0.06}
                    onChange={(e) => setTuringConfig({ warpSpeed: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>

              <hr className="border-emerald-400/20" />

              {/* Lighting */}
              <div className="space-y-3">
                <div className="font-semibold text-emerald-300">Lighting</div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Ambient</span>
                    <span className="text-emerald-300">{(turing.ambient ?? 0.25).toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={turing.ambient ?? 0.25}
                    onChange={(e) => setTuringConfig({ ambient: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Diffuse</span>
                    <span className="text-emerald-300">{(turing.diffuse ?? 0.85).toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={turing.diffuse ?? 0.85}
                    onChange={(e) => setTuringConfig({ diffuse: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Specular</span>
                    <span className="text-emerald-300">{(turing.specular ?? 0.25).toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={turing.specular ?? 0.25}
                    onChange={(e) => setTuringConfig({ specular: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Shininess</span>
                    <span className="text-emerald-300">{(turing.shininess ?? 24.0).toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="128"
                    step="1"
                    value={turing.shininess ?? 24.0}
                    onChange={(e) => setTuringConfig({ shininess: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Rim</span>
                    <span className="text-emerald-300">{(turing.rim ?? 0.25).toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={turing.rim ?? 0.25}
                    onChange={(e) => setTuringConfig({ rim: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Light Dir</span>
                    <span className="text-emerald-300 text-xs">
                      [{turing.lightDir?.[0]?.toFixed(1) ?? 0.2}, {turing.lightDir?.[1]?.toFixed(1) ?? 0.5}, {turing.lightDir?.[2]?.toFixed(1) ?? 1.0}]
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs text-emerald-400/70">X:</span>
                      <input
                        type="range"
                        min="-1"
                        max="1"
                        step="0.1"
                        value={turing.lightDir?.[0] ?? 0.2}
                        onChange={(e) => {
                          const current = turing.lightDir ?? [0.2, 0.5, 1.0];
                          setTuringConfig({ lightDir: [parseFloat(e.target.value), current[1], current[2]] });
                        }}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-400/70">Y:</span>
                      <input
                        type="range"
                        min="-1"
                        max="1"
                        step="0.1"
                        value={turing.lightDir?.[1] ?? 0.5}
                        onChange={(e) => {
                          const current = turing.lightDir ?? [0.2, 0.5, 1.0];
                          setTuringConfig({ lightDir: [current[0], parseFloat(e.target.value), current[2]] });
                        }}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-400/70">Z:</span>
                      <input
                        type="range"
                        min="-1"
                        max="1"
                        step="0.1"
                        value={turing.lightDir?.[2] ?? 1.0}
                        onChange={(e) => {
                          const current = turing.lightDir ?? [0.2, 0.5, 1.0];
                          setTuringConfig({ lightDir: [current[0], current[1], parseFloat(e.target.value)] });
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-emerald-400/20" />

              {/* Color Gradient */}
              <div className="space-y-3">
                <div className="font-semibold text-emerald-300">Color Gradient</div>

                {turing.enableColor && (
                  <>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Hue Offset</span>
                        <span className="text-emerald-300">{((turing.colorHueOffset ?? 0.0) * 360).toFixed(0)}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={turing.colorHueOffset ?? 0.0}
                        onChange={(e) => setTuringConfig({ colorHueOffset: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Color Speed</span>
                        <span className="text-emerald-300">{(turing.colorSpeed ?? 1.0).toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={turing.colorSpeed ?? 1.0}
                        onChange={(e) => setTuringConfig({ colorSpeed: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Saturation</span>
                        <span className="text-emerald-300">{((turing.colorSaturation ?? 0.9) * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={turing.colorSaturation ?? 0.9}
                        onChange={(e) => setTuringConfig({ colorSaturation: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Intensity</span>
                        <span className="text-emerald-300">{((turing.colorIntensity ?? 0.8) * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={turing.colorIntensity ?? 0.8}
                        onChange={(e) => setTuringConfig({ colorIntensity: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackdropControls;
