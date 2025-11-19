# PowerShell script to create backend .env file
Write-Host "Setting up backend environment..." -ForegroundColor Green

$envPath = "backend\.env"

if (Test-Path $envPath) {
    Write-Host "✓ backend\.env already exists" -ForegroundColor Yellow
} else {
    $envContent = @"
# Gemini API Configuration
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM

# Flask Configuration
SECRET_KEY=dev-secret-key-local-development
FLASK_ENV=development

# Frontend Origin (for CORS)
FRONTEND_ORIGIN=http://localhost:5000
"@
    
    Set-Content -Path $envPath -Value $envContent
    Write-Host "✓ Created backend\.env file" -ForegroundColor Green
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install backend dependencies: cd backend && pip install -r requirements.txt"
Write-Host "2. Start backend: cd backend && python wsgi.py"
Write-Host "3. In another terminal, start frontend: npm run dev"
Write-Host "4. Open http://localhost:5000 in your browser"

