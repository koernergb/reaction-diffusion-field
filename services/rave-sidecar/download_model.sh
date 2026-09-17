#!/usr/bin/env bash
# Download a pretrained streaming RAVE .ts from the IRCAM public catalog.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p models
NAME="${1:-sol_ordinario_fast}"
OUT="models/${NAME}.ts"
URL="https://play.forum.ircam.fr/rave-vst-api/get_model/${NAME}"
echo "Downloading ${NAME} → ${OUT}"
curl -L --fail -o "$OUT" "$URL"
ls -lh "$OUT"
echo "Done. Run: python server.py --model ${OUT}"
