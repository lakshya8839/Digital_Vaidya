@echo off
echo Starting Digital Vaidya Local Development...
echo.

echo Step 1: Starting Backend Server...
start cmd /k "cd backend && python wsgi.py"
timeout /t 3 /nobreak >nul

echo Step 2: Starting Frontend Server...
start cmd /k "npm run dev"
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5000
echo ========================================
echo.
echo Both servers are starting in separate windows.
echo Open http://localhost:5000 in your browser once both are ready.
echo.
pause

