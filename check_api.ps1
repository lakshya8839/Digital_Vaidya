# API Health Check Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Digital Vaidya API Health Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8000"

# Test 1: Backend Health
Write-Host "1. Testing Backend Health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/health" -Method GET -TimeoutSec 3 -ErrorAction Stop
    Write-Host "   ✓ Backend is running (Status: $($response.StatusCode))" -ForegroundColor Green
    Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ Backend is NOT running or not accessible" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Solution: Start the backend server:" -ForegroundColor Yellow
    Write-Host "   cd backend" -ForegroundColor White
    Write-Host "   python wsgi.py" -ForegroundColor White
    exit 1
}

Write-Host ""

# Test 2: Face Recognition API
Write-Host "2. Testing Face Recognition API..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/face/health" -Method GET -TimeoutSec 3 -ErrorAction Stop
    Write-Host "   ✓ Face Recognition API is running" -ForegroundColor Green
    $data = $response.Content | ConvertFrom-Json
    Write-Host "   Registered faces: $($data.registeredFaces)" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ Face Recognition API error" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Chatbot API
Write-Host "3. Testing Chatbot API..." -ForegroundColor Yellow
try {
    $body = @{
        message = "Hello"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$baseUrl/api/chatbot" -Method POST -Body $body -ContentType "application/json" -TimeoutSec 10 -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    
    if ($data.ok) {
        Write-Host "   ✓ Chatbot API is working" -ForegroundColor Green
        Write-Host "   Response: $($data.response.Substring(0, [Math]::Min(50, $data.response.Length)))..." -ForegroundColor Gray
    } else {
        Write-Host "   ⚠ Chatbot API returned error: $($data.error)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ✗ Chatbot API error" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    if ($_.Exception.Message -like "*GEMINI_API_KEY*" -or $_.Exception.Message -like "*API key*") {
        Write-Host "   Solution: Check that GEMINI_API_KEY is set in backend/.env" -ForegroundColor Yellow
    }
}

Write-Host ""

# Test 4: Report Generation API
Write-Host "4. Testing Report Generation API..." -ForegroundColor Yellow
try {
    $body = @{
        description = "Test symptom"
        affectedRegions = @("Head")
        healthParams = @{}
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$baseUrl/api/generate-summary" -Method POST -Body $body -ContentType "application/json" -TimeoutSec 15 -ErrorAction Stop
    
    if ($response.Headers['Content-Type'] -like "*pdf*") {
        Write-Host "   ✓ Report Generation API is working" -ForegroundColor Green
        Write-Host "   PDF size: $($response.Content.Length) bytes" -ForegroundColor Gray
    } else {
        Write-Host "   ⚠ Unexpected response type: $($response.Headers['Content-Type'])" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ✗ Report Generation API error" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
    if ($_.Exception.Message -like "*GEMINI_API_KEY*" -or $_.Exception.Message -like "*API key*") {
        Write-Host "   Solution: Check that GEMINI_API_KEY is set in backend/.env" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Health Check Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If any tests failed, check:" -ForegroundColor Yellow
Write-Host "1. Backend is running: cd backend && python wsgi.py" -ForegroundColor White
Write-Host "2. Environment variables are set in backend/.env" -ForegroundColor White
Write-Host "3. All dependencies are installed: pip install -r requirements.txt" -ForegroundColor White
Write-Host ""

