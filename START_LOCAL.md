# 🚀 Quick Start - Run on Localhost

## Option 1: Automated Setup (Recommended)

### Windows:
```bash
# Run the setup script
python setup-local-env.py

# Then start both servers
run-local.bat
```

### Mac/Linux:
```bash
# Make script executable
chmod +x run-local.sh

# Run setup and start servers
python3 setup-local-env.py
./run-local.sh
```

## Option 2: Manual Setup

### Step 1: Setup Backend Environment
```bash
# Create .env file in backend directory
cd backend
```

Create a file named `.env` with:
```env
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
SECRET_KEY=dev-secret-key-local
FLASK_ENV=development
FRONTEND_ORIGIN=http://localhost:5000
```

### Step 2: Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 3: Start Backend Server
```bash
# From backend directory
python wsgi.py
```

You should see:
```
🚀 Digital Vaidya Backend Server
📍 Running on: http://localhost:8000
```

### Step 4: Start Frontend (New Terminal)
```bash
# From root directory
npm install
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5000/
```

### Step 5: Open in Browser
Open **http://localhost:5000** in your browser!

## ✅ Verify It's Working

1. **Backend Health Check**: Visit http://localhost:8000/api/health
   - Should return: `{"status": "ok"}`

2. **Frontend**: Visit http://localhost:5000
   - Should show the login page

3. **Test Features**:
   - Login/Authentication
   - Symptom Analysis
   - Chatbot
   - Health Summary

## 🐛 Troubleshooting

### Port Already in Use?
- Backend (8000): Change port in `backend/wsgi.py` or set `PORT=8001`
- Frontend (5000): Vite will automatically use next available port

### Backend Not Starting?
- Check Python version: `python --version` (need 3.8+)
- Install dependencies: `pip install -r requirements.txt`
- Check if `.env` file exists in `backend` directory

### Frontend Not Connecting to Backend?
- Make sure backend is running on port 8000
- Check browser console for errors
- Verify Vite proxy in `vite.config.js`

### API Errors?
- Check backend terminal for error messages
- Verify Gemini API key in `backend/.env`
- Check CORS settings

## 📝 Notes

- Backend runs on: **http://localhost:8000**
- Frontend runs on: **http://localhost:5000**
- Frontend automatically proxies `/api/*` to backend
- All environment variables are set for local development

