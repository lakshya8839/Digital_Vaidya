@echo off
echo Starting Digital Vaidya Local Development...
echo.

echo Step 1: Setting up backend environment variables...
set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
set FLASK_ENV=development
set FRONTEND_ORIGIN=http://localhost:5000
set SECRET_KEY=dev-secret-key-local

echo Step 2: Starting backend server...
cd backend
start "Backend Server" cmd /k "set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM && set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM && set FLASK_ENV=development && set FRONTEND_ORIGIN=http://localhost:5000 && python wsgi.py"
cd ..

timeout /t 3 /nobreak >nul

echo Step 3: Starting frontend server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5000
echo ========================================
echo.
echo Press any key to exit (servers will continue running)...
pause >nul

