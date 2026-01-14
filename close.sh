#!/bin/bash

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PID_DIR="$ROOT_DIR/.pids"

echo "🛑 Stopping DBRift demo..."

# Backend
if [ -f "$PID_DIR/backend.pid" ]; then
  kill "$(cat "$PID_DIR/backend.pid")" && echo "✅ Backend stopped"
  rm "$PID_DIR/backend.pid"
else
  echo "⚠️ Backend PID not found"
fi

# Frontend
if [ -f "$PID_DIR/frontend.pid" ]; then
  kill "$(cat "$PID_DIR/frontend.pid")" && echo "✅ Frontend stopped"
  rm "$PID_DIR/frontend.pid"
else
  echo "⚠️ Frontend PID not found"
fi

echo "🧹 Cleanup done"
