# 🚀 Run Digital Vaidya on Localhost

## ✅ Everything is Ready!

Your project is configured and ready to run locally. Here's how:

---

## 🎯 Quick Start (Choose One)

### Option 1: Automated Script (Recommended)

**Windows:**
```powershell
.\start_local.ps1
```

This will:
- Create the `.env` file automatically
- Start the backend server
- Start the frontend server
- Open both in separate windows

### Option 2: Batch File

**Windows:**
```cmd
run_local.bat
```

### Option 3: Manual Setup

Follow the steps below.

---

## 📋 Manual Setup Steps

### Step 1: Create Backend Environment File

Create `backend/.env` file with this content:

```env
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV=development
FRONTEND_ORIGIN=http://localhost:5000
SECRET_KEY=dev-secret-key-local
```

**Quick way:** Copy `backend/.env.template` to `backend/.env`

### Step 2: Install Dependencies

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
npm install
```

### Step 3: Start Backend (Terminal 1)

```bash
cd backend
python wsgi.py
```

**Expected output:**
```
==================================================
🚀 Digital Vaidya Backend Server
==================================================
📍 Running on: http://localhost:8000
🔧 Debug mode: True
🌐 CORS enabled for: http://localhost:5000
==================================================
```

### Step 4: Start Frontend (Terminal 2)

**Keep Terminal 1 running!** Open a new terminal:

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5000/
```

### Step 5: Open in Browser

Go to: **http://localhost:5000**

---

## ✅ Verify It's Working

1. **Backend Health:** http://localhost:8000/api/health
   - Should show: `{"status": "ok"}`

2. **Frontend:** http://localhost:5000
   - Should show the Digital Vaidya login page

3. **Test Features:**
   - Login/Register
   - Symptom Analysis
   - Chatbot

---

## 🐛 Troubleshooting

### Python Not Found
- Try: `python3`, `py`, or `python3.11`
- Install Python from https://python.org

### Port Already in Use
- Close other apps using ports 8000 or 5000
- Or change ports in config files

### Module Not Found
- Run: `pip install -r backend/requirements.txt`
- Run: `npm install`

### API Errors
- Make sure backend is running (check Terminal 1)
- Verify `backend/.env` file exists
- Check that Gemini API key is correct

---

## 📝 Files Created for You

- ✅ `start_local.ps1` - Automated startup script
- ✅ `run_local.bat` - Windows batch file
- ✅ `run_local.sh` - Linux/Mac script
- ✅ `backend/.env.template` - Environment template
- ✅ `verify_setup.ps1` - Setup verification script
- ✅ `START_HERE.md` - Detailed guide
- ✅ `LOCAL_SETUP.md` - Complete setup docs

---

## 🛑 Stopping Servers

Press `Ctrl+C` in each terminal window.

---

## 🎉 You're All Set!

Your Digital Vaidya application is ready to run locally with:
- ✅ Gemini API configured
- ✅ Firebase configured
- ✅ All dependencies listed
- ✅ Environment variables ready

**Just run `start_local.ps1` and you're good to go!**

