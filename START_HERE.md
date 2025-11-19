# 🚀 Start Here - Run Digital Vaidya Locally

## Quick Start (Easiest Method)

### For Windows:
1. **Double-click** `start_local.ps1` OR
2. **Right-click** → Run with PowerShell

### For Linux/Mac:
```bash
chmod +x run_local.sh
./run_local.sh
```

---

## Manual Setup (Step by Step)

### Step 1: Install Backend Dependencies

Open a terminal in the project root and run:

```bash
cd backend
pip install -r requirements.txt
```

**Note:** If `pip` doesn't work, try:
- `pip3 install -r requirements.txt`
- `python -m pip install -r requirements.txt`
- `python3 -m pip install -r requirements.txt`

### Step 2: Create Backend Environment File

Create a file named `.env` in the `backend` folder with this content:

```env
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV=development
FRONTEND_ORIGIN=http://localhost:5000
SECRET_KEY=dev-secret-key-local
```

**Quick way:** Copy `backend/.env.template` to `backend/.env`

### Step 3: Install Frontend Dependencies

In the project root:

```bash
npm install
```

### Step 4: Start Backend Server

Open **Terminal 1** and run:

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

### Step 5: Start Frontend Server

Open **Terminal 2** (keep Terminal 1 running) and run:

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5000/
```

### Step 6: Open in Browser

Open your browser and go to: **http://localhost:5000**

---

## ✅ Verify It's Working

1. **Backend Health Check:** http://localhost:8000/api/health
   - Should return: `{"status": "ok"}`

2. **Frontend:** http://localhost:5000
   - Should show the Digital Vaidya login page

3. **Test Features:**
   - Try logging in/registering
   - Test symptom analysis
   - Try the chatbot

---

## 🐛 Troubleshooting

### "Python not found"
- Install Python from https://python.org
- Or use: `python3`, `py`, or `python3.11`

### "Port 8000 already in use"
- Close other applications using port 8000
- Or change port in `backend/wsgi.py`

### "Port 5000 already in use"
- Close other applications using port 5000
- Vite will suggest an alternative port

### "Module not found" errors
- Make sure you ran: `pip install -r requirements.txt` in the `backend` folder
- Make sure you ran: `npm install` in the root folder

### API calls failing
- Make sure backend is running (check Terminal 1)
- Check that backend shows it's running on port 8000
- Verify `.env` file exists in `backend` folder

### Gemini API errors
- Check that `GEMINI_API_KEY` is set in `backend/.env`
- Verify the API key is correct: `AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM`

---

## 📝 Need More Help?

See `LOCAL_SETUP.md` for detailed instructions.

---

## 🛑 Stopping the Servers

Press `Ctrl+C` in each terminal window to stop the servers.

