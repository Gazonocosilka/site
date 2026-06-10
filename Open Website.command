#!/bin/bash
# Double-click this file to open the portfolio locally.
# - Pulls the latest version from GitHub (so you always see the newest site)
# - Starts the Next.js dev server
# - Opens your default browser to http://localhost:3000
# Close this Terminal window when you're done viewing.

set -e

# cd to the folder this script lives in (the site repo root)
cd "$(dirname "$0")"

# Make sure Node is on PATH. The installation on this Mac lives here:
export PATH="$HOME/.local/node/bin:$PATH"

# Sanity-check node is reachable; if not, point the user at what's wrong.
if ! command -v node >/dev/null 2>&1; then
  echo "❌  Node isn't available on PATH."
  echo "   Expected to find it at ~/.local/node/bin/node"
  echo "   Install Node 18+ and re-run this file."
  echo ""
  echo "Press any key to close this window."
  read -n 1 -s -r
  exit 1
fi

PORT=3000
URL="http://localhost:$PORT"

# Pull the latest version from GitHub so you always see the newest site.
# Fails gracefully — if you're offline, or git fails for any reason, we
# just keep the local copy and carry on. Uses --ff-only so a local
# change can never get clobbered without you noticing.
if command -v git >/dev/null 2>&1 && [ -d .git ]; then
  echo "→ Checking for updates from GitHub..."
  if git pull --ff-only --quiet 2>/dev/null; then
    echo "✓ Up to date."
  else
    echo "⚠  Couldn't pull updates (offline, or you have local changes)."
    echo "   Running the version already on disk."
  fi
  echo ""
fi

# Install deps the first time, OR if package.json was updated by the pull.
# (`-nt` = "newer than" — true if package.json was modified more recently
# than node_modules, which means a pull likely added/changed dependencies.)
NEED_INSTALL=0
if [ ! -d node_modules ]; then
  NEED_INSTALL=1
elif [ package.json -nt node_modules ]; then
  NEED_INSTALL=1
fi
if [ "$NEED_INSTALL" = "1" ]; then
  echo "→ Installing packages (about 30s)..."
  npm install --no-audit --no-fund
  echo "✓ Packages installed."
  echo ""
fi

# Free the port if anything's already listening on it
EXISTING="$(lsof -ti tcp:$PORT 2>/dev/null || true)"
if [ -n "$EXISTING" ]; then
  echo "→ Port $PORT is busy — freeing it..."
  kill $EXISTING 2>/dev/null || true
  sleep 0.6
fi

echo ""
echo "┌──────────────────────────────────────────────────────────┐"
echo "│  Starting Inna Portfolio · dev server                    │"
echo "│  $URL                                  │"
echo "│                                                          │"
echo "│  • Browser will open automatically in a moment.          │"
echo "│  • Leave this window open while you're viewing the site. │"
echo "│  • Close it (or Ctrl-C) to stop the server.              │"
echo "└──────────────────────────────────────────────────────────┘"
echo ""

# Open the browser shortly after the server starts compiling.
# Next.js prints "✓ Ready in …" within a couple of seconds.
( sleep 3 && open "$URL" ) &

# Start the dev server in the foreground — keeps the window alive,
# shows logs, terminates cleanly on Ctrl-C / window close.
exec npm run dev
