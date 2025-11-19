# 🏠 Run Digital Vaidya on Localhost

## Quick Start (3 Steps)

### 1️⃣ Setup Backend Environment
The `.env` file has been created in the `backend` directory with your Gemini API key.

### 2️⃣ Install Dependencies

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
npm install
```

### 3️⃣ Run Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
python wsgi.py
```
✅ Backend will run on **http://localhost:8000**

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Frontend will run on **http://localhost:5000**

### 4️⃣ Open in Browser
Open **http://localhost:5000** 🎉

---

## What's Configured?

✅ **Gemini API Key**: `AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM`  
✅ **Backend Port**: 8000  
✅ **Frontend Port**: 5000  
✅ **CORS**: Enabled for localhost  
✅ **Environment Variables**: All set in `backend/.env`

## Test It Works

1. **Backend Health**: http://localhost:8000/api/health
   - Should return: `{"status": "ok"}`

2. **Frontend**: http://localhost:5000
   - Should show the login page

3. **Try Features**:
   - Login/Authentication
   - Symptom Analysis (uses Gemini AI)
   - Chatbot (uses Gemini AI)
   - Health Summary PDF

## Troubleshooting

### Backend Issues
- **Port 8000 in use?** Change port: `set PORT=8001` (Windows) or `export PORT=8001` (Mac/Linux)
- **Module not found?** Run: `pip install -r requirements.txt`
- **API key error?** Check `backend/.env` file exists

### Frontend Issues
- **Port 5000 in use?** Vite will auto-use next available port
- **Can't connect to backend?** Make sure backend is running on port 8000
- **Build errors?** Run: `npm install`

### API Not Working?
- Check backend terminal for errors
- Verify Gemini API key in `backend/.env`
- Check browser console (F12) for errors

## Need Help?

See `START_LOCAL.md` for detailed instructions or `LOCAL_SETUP.md` for comprehensive guide.

