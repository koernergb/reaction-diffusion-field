# Reaction–Diffusion Field

An interactive Gray–Scott reaction-diffusion playground rendered with WebGL. Move the pointer across the field to perturb the simulation, tune its behavior from the settings panel, and optionally enable browser-native sonification driven by the evolving field.

The demo is a standalone Next.js application. Its renderer remains isolated as a small workspace package so the same field can be embedded elsewhere without carrying the demo UI with it.

## Features

- Real-time Gray–Scott reaction-diffusion simulation
- Pointer-driven field injection and lighting
- Adjustable simulation, surface, warp, lighting, and color parameters
- Responsive performance settings for mobile devices
- Optional Web Audio sonification with no server-side inference
- Reusable React/WebGL rendering package

## Run locally

Requirements: Node.js 20+ and pnpm 10.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate a production build

```bash
pnpm build
pnpm start
```

The root build first compiles the rendering engine, then builds the Next.js demo.

## Project structure

```text
app/                                Next.js demo entrypoint
src/components/                     Field and control interface
src/audio/                          Browser-native sonification
src/lib/                            Demo state
packages/reaction-diffusion-engine/ Reusable WebGL renderer
```

## Useful commands

```bash
pnpm dev           # Start the demo in development mode
pnpm build         # Build the engine and production demo
pnpm build:engine  # Build only the reusable renderer
pnpm typecheck     # Run TypeScript validation
```
