# Backend Setup Instructions

## Python Installation Required

It looks like Python is not installed or not in your system PATH. Here's how to set it up:

### Step 1: Install Python

1. Download Python from: https://www.python.org/downloads/
2. **IMPORTANT:** During installation, check "Add Python to PATH"
3. Install Python 3.8 or higher

### Step 2: Verify Installation

Open a new terminal and run:
```bash
python --version
```

You should see something like: `Python 3.11.x`

### Step 3: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 4: Start Backend Server

```bash
python wsgi.py
```

You should see:
```
==================================================
🚀 Digital Vaidya Backend Server
==================================================
📍 Running on: http://localhost:8000
```

### Step 5: Keep Backend Running

Keep this terminal open. The backend must be running for the frontend to work properly.

---

## Alternative: Use Python Launcher

If `python` doesn't work, try:
- `py` (Python launcher for Windows)
- `python3`
- `python3.11` (or your version)

---

## Quick Test

Once backend is running, test it:
- Open: http://localhost:8000/api/health
- Should return: `{"status": "ok"}`

---

## Current Status

✅ Frontend: Running on http://localhost:5000
⏳ Backend: Waiting for Python installation

After installing Python and starting the backend, your app will be fully functional!

