# Local Development Setup

## Quick Start

### Option 1: Using the Startup Script (Windows)
```bash
run_local.bat
```

### Option 2: Using the Startup Script (Linux/Mac)
```bash
chmod +x run_local.sh
./run_local.sh
```

### Option 3: Manual Setup

#### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
npm install
```

#### Step 2: Set Environment Variables

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM"
$env:GOOGLE_API_KEY="AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM"
$env:FLASK_ENV="development"
$env:FRONTEND_ORIGIN="http://localhost:5000"
```

**Windows (CMD):**
```cmd
set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
set FLASK_ENV=development
set FRONTEND_ORIGIN=http://localhost:5000
```

**Linux/Mac:**
```bash
export GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
export GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
export FLASK_ENV=development
export FRONTEND_ORIGIN=http://localhost:5000
```

#### Step 3: Create Backend .env File (Optional but Recommended)

Create a file `backend/.env` with:
```env
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV=development
FRONTEND_ORIGIN=http://localhost:5000
SECRET_KEY=dev-secret-key-local
```

#### Step 4: Start Backend Server

**Terminal 1:**
```bash
cd backend
python wsgi.py
```

You should see:
```
==================================================
🚀 Digital Vaidya Backend Server
==================================================
📍 Running on: http://localhost:8000
🔧 Debug mode: True
🌐 CORS enabled for: http://localhost:5000
==================================================
```

#### Step 5: Start Frontend Server

**Terminal 2:**
```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5000/
  ➜  Network: use --host to expose
```

## Access the Application

- **Frontend:** http://localhost:5000
- **Backend API:** http://localhost:8000
- **Health Check:** http://localhost:8000/api/health

## Testing

1. Open http://localhost:5000 in your browser
2. Test the login/registration
3. Try the symptom analysis feature
4. Test the chatbot

## Troubleshooting

### Backend won't start
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Check if port 8000 is already in use
- Verify environment variables are set

### Frontend won't start
- Make sure Node.js is installed: `node --version`
- Install dependencies: `npm install`
- Check if port 5000 is already in use

### API calls failing
- Make sure backend is running on port 8000
- Check browser console for CORS errors
- Verify `FRONTEND_ORIGIN` is set to `http://localhost:5000`

### Gemini API errors
- Verify `GEMINI_API_KEY` is set correctly
- Check backend console for error messages
- Make sure the API key is valid

## Stopping Servers

- Press `Ctrl+C` in each terminal window to stop the servers
