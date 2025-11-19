#!/bin/bash

echo "Starting Digital Vaidya Local Development..."
echo ""

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env file..."
    cat > backend/.env << EOF
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
SECRET_KEY=dev-secret-key-local
FLASK_ENV=development
FRONTEND_ORIGIN=http://localhost:5000
EOF
    echo "✓ Created backend/.env file"
fi

echo "Step 1: Installing backend dependencies..."
cd backend
pip install -r requirements.txt > /dev/null 2>&1
echo "✓ Backend dependencies installed"

echo "Step 2: Starting Backend Server (port 8000)..."
python wsgi.py &
BACKEND_PID=$!
cd ..
sleep 3

echo "Step 3: Installing frontend dependencies..."
npm install > /dev/null 2>&1
echo "✓ Frontend dependencies installed"

echo "Step 4: Starting Frontend Server (port 5000)..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "✓ Backend: http://localhost:8000"
echo "✓ Frontend: http://localhost:5000"
echo "========================================"
echo ""
echo "Both servers are running!"
echo "Open http://localhost:5000 in your browser"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait

