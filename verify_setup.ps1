# Verify Digital Vaidya Setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Digital Vaidya Setup Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
$pythonCmd = $null
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCmd = "python"
    $version = python --version 2>&1
    Write-Host "  ✓ Python found: $version" -ForegroundColor Green
} else {
    Write-Host "  ✗ Python not found" -ForegroundColor Red
    $allGood = $false
}

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $version = node --version
    Write-Host "  ✓ Node.js found: $version" -ForegroundColor Green
} else {
    Write-Host "  ✗ Node.js not found" -ForegroundColor Red
    $allGood = $false
}

# Check backend dependencies
Write-Host "Checking backend dependencies..." -ForegroundColor Yellow
if (Test-Path "backend\requirements.txt") {
    Write-Host "  ✓ requirements.txt found" -ForegroundColor Green
    if (Test-Path "backend\.env") {
        Write-Host "  ✓ .env file found" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ .env file not found (will be created on first run)" -ForegroundColor Yellow
        if (Test-Path "backend\.env.template") {
            Write-Host "  ✓ .env.template found (can be copied)" -ForegroundColor Green
        }
    }
} else {
    Write-Host "  ✗ requirements.txt not found" -ForegroundColor Red
    $allGood = $false
}

# Check frontend dependencies
Write-Host "Checking frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "  ✓ package.json found" -ForegroundColor Green
    if (Test-Path "node_modules") {
        Write-Host "  ✓ node_modules found (dependencies installed)" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ node_modules not found (run: npm install)" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✗ package.json not found" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""
if ($allGood) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✓ Setup looks good!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: start_local.ps1" -ForegroundColor White
    Write-Host "   OR follow manual setup in START_HERE.md" -ForegroundColor White
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "✗ Some issues found" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please fix the issues above and run this script again." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

