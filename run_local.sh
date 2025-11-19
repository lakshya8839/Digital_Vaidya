#!/bin/bash

echo "Starting Digital Vaidya Local Development..."
echo ""

# Set environment variables for backend
export GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
export GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
export FLASK_ENV=development
export FRONTEND_ORIGIN=http://localhost:5000
export SECRET_KEY=dev-secret-key-local

echo "Step 1: Starting backend server..."
cd backend
python wsgi.py &
BACKEND_PID=$!
cd ..

sleep 3

echo "Step 2: Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Both servers are starting!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5000"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

