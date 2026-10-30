#!/bin/sh
# Renders public/og.png (1200x630 share image) and the app icons with headless Chrome. Run after changing scripts/*.html.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 --virtual-time-budget=6000 --screenshot="$PWD/public/og.png" "file://$PWD/scripts/og.html" 2>/dev/null
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=512,512 --virtual-time-budget=6000 --screenshot="$PWD/public/icon-512.png" "file://$PWD/scripts/icon.html" 2>/dev/null
sips -z 192 192 public/icon-512.png --out public/icon-192.png >/dev/null
sips -z 180 180 public/icon-512.png --out public/apple-touch-icon.png >/dev/null
ls -la public
