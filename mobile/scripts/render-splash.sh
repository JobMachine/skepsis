#!/bin/sh
# Renders assets/images/splash-icon.png from scripts/splash.html with headless Chrome.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --default-background-color=00000000 --window-size=1024,1024 --virtual-time-budget=6000 --screenshot="$PWD/assets/images/splash-icon.png" "file://$PWD/scripts/splash.html" 2>/dev/null
ls -la assets/images/splash-icon.png
