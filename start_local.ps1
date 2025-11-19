# PowerShell script to start Digital Vaidya locally

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Digital Vaidya Local Development Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists in backend
$envFile = "backend\.env"
if (-not (Test-Path $envFile)) {
    Write-Host "Creating .env file in backend directory..." -ForegroundColor Yellow
    Copy-Item "backend\.env.template" $envFile -ErrorAction SilentlyContinue
    if (Test-Path $envFile) {
        Write-Host "✓ .env file created" -ForegroundColor Green
    } else {
        Write-Host "⚠ Could not create .env file. Please create it manually." -ForegroundColor Yellow
        Write-Host "  Copy backend\.env.template to backend\.env" -ForegroundColor Yellow
    }
}

# Set environment variables
$env:GEMINI_API_KEY = "AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM"
$env:GOOGLE_API_KEY = "AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM"
$env:FLASK_ENV = "development"
$env:FRONTEND_ORIGIN = "http://localhost:5000"
$env:SECRET_KEY = "dev-secret-key-local"

Write-Host ""
Write-Host "Step 1: Checking dependencies..." -ForegroundColor Cyan

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js." -ForegroundColor Red
    exit 1
}

# Check Python
$pythonCmd = $null
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCmd = "python"
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    $pythonCmd = "python3"
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
    $pythonCmd = "py"
}

if ($pythonCmd) {
    $pythonVersion = & $pythonCmd --version
    Write-Host "✓ Python: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Python not found. Please install Python." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Installing frontend dependencies..." -ForegroundColor Cyan
if (-not (Test-Path "node_modules")) {
    npm install
} else {
    Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 3: Starting servers..." -ForegroundColor Cyan
Write-Host ""

# Start backend in new window
Write-Host "Starting backend server on http://localhost:8000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; `$env:GEMINI_API_KEY='AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM'; `$env:GOOGLE_API_KEY='AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM'; `$env:FLASK_ENV='development'; `$env:FRONTEND_ORIGIN='http://localhost:5000'; $pythonCmd wsgi.py"

Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Starting frontend server on http://localhost:5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Both servers are starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Two new windows have opened with the servers." -ForegroundColor Yellow
Write-Host "Close those windows to stop the servers." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit this script..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

