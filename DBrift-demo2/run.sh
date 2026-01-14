#!/bin/bash

set -e

echo "🚀 Starting DBRift demo..."

# ---------- Backend ----------
echo "🔧 Starting Spring Boot backend..."
cd "$(dirname "$0")/backend"

# Run backend in background
mvn spring-boot:run &
BACKEND_PID=$!

# ---------- Frontend ----------
echo "🎨 Starting React frontend..."
cd ../frontend

# Install dependencies if node_modules missing
if [ ! -d "node_modules" ]; then
  echo "📦 Installing frontend dependencies..."
  npm install
fi

npm run dev &
FRONTEND_PID=$!

# ---------- Info ----------
echo ""
echo "✅ Backend running on http://localhost:8080"
echo "✅ Frontend running on http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both"

# ---------- Wait ----------
wait $BACKEND_PID $FRONTEND_PID
