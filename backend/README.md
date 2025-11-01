# DigitalVaidya Backend (Flask)

Frontend-only demo endpoints for auth, file uploads, feedback/contact, and a stub analyzer.

## Setup

```bash
cd backend
python -m venv .venv
# Windows PowerShell
. .venv/Scripts/Activate.ps1
pip install -r requirements.txt
python wsgi.py
```

The API will run on http://localhost:5000

CORS is enabled for http://localhost:5173 by default.

## Endpoints

- POST /api/auth/login { email }
- POST /api/auth/signup { email }
- POST /api/auth/face-login
- POST /api/uploads/aadhaar form-data: file=(image/pdf)
- POST /api/forms/feedback { rating, feedback }
- POST /api/forms/contact { name, email, message }
- POST /api/analyze { description }
- GET /api/health

Note: This is a mock backend for demo purposes only (no persistence).

