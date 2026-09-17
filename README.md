# Reaction–Diffusion Field

An interactive Gray–Scott reaction–diffusion simulation rendered as an evolving field of illuminated Turing stripes.

The simulation runs entirely in WebGL 2. A ping-pong reaction–diffusion pass evolves the chemical field, a height pass derives surface structure, and a final shader renders warped bands with directional lighting. Pointer and touch movement disturb the field in real time.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. Use the control panel to change presets, simulation parameters, surface lighting, and rendering modes.

## Build the standalone demo

```bash
pnpm build
pnpm preview
```

The deployable static site is generated in `dist/`.

## Build the reusable library

```bash
pnpm build:library
```

Library output is written to `dist-lib/`. The framework-agnostic runtime is exported from the package root, and the React backdrop is exported from `./react`.

## Requirements

- WebGL 2
- Floating-point render-target support
- A current desktop or mobile browser

## Deployment

The demo is a static Vite site. Deploy using:

- Build command: `pnpm build`
- Output directory: `dist`

## Origin

This project was extracted from the reaction–diffusion backdrop developed for the earlier [`personal-site`](https://github.com/koernergb/personal-site) project. Its relevant Git history has been preserved.
