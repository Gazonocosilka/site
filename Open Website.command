#!/bin/bash
# Double-click this file to open the website locally.
# - Builds the static site if needed (./out)
# - Starts a tiny local HTTP server on port 8765
# - Opens your default browser to it
# Close the Terminal window when you're done.

set -e

# cd to the folder this script lives in
cd "$(dirname "$0")"

# Make sure Node is on PATH (this machine's install lives in ~/.local/node)
export PATH="$HOME/.local/node/bin:$PATH"

PORT=8765
SITE_DIR="$(pwd)/out"

# Build the static site if the out/ folder is missing
if [ ! -f "$SITE_DIR/index.html" ]; then
  echo "→ First time setup: building the static site (this takes a few seconds)..."
  npm install --no-audit --no-fund
  npm run build
  echo "✓ Built. Saved to $SITE_DIR"
  echo ""
fi

# Free the port if something's already on it
EXISTING="$(lsof -ti tcp:$PORT 2>/dev/null || true)"
if [ -n "$EXISTING" ]; then
  echo "→ Port $PORT is in use, freeing it..."
  kill $EXISTING 2>/dev/null || true
  sleep 0.5
fi

URL="http://localhost:$PORT"
echo "→ Starting local server at $URL"
echo "→ Opening browser..."
echo ""
echo "Leave this Terminal window open while you view the site."
echo "Close this window to stop the server."
echo ""

# Open the browser shortly after the server starts
( sleep 1 && open "$URL" ) &

# Serve the static export folder — block here until user closes the terminal
cd "$SITE_DIR"
python3 -m http.server "$PORT"
