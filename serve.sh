#!/usr/bin/env bash
set -euo pipefail
DIR=/home/dgxspark/ai/studio-guide
PORT=8790
cd "$DIR"
if ss -lntp 2>/dev/null | grep -q ":$PORT "; then
  echo "Guide already serving on http://127.0.0.1:$PORT"
  exit 0
fi
nohup python3 -m http.server "$PORT" --bind 0.0.0.0 >/tmp/studio-guide.log 2>&1 &
echo $! > /tmp/studio-guide.pid
sleep 0.3
echo "Guide: http://127.0.0.1:$PORT  or  http://192.168.178.98:$PORT"
