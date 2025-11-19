# ⚡ Quick Deployment Guide

## Fast Track Deployment (5 Minutes)

---

## 🔑 API Keys (Copy These)

```
GEMINI_API_KEY: AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY: AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FIREBASE_API_KEY: AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y
```

---

## 🚀 Backend Deployment (Heroku)

### 1. Install Heroku CLI
```bash
winget install Heroku.HerokuCLI
```

### 2. Login & Create App
```bash
heroku login
cd backend
heroku create digital-vaidya-backend
```

### 3. Set Environment Variables
```bash
heroku config:set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
```

### 4. Deploy
```bash
git init
git add .
git commit -m "Deploy"
git push heroku main
```

### 5. Note Your Backend URL
- Example: `https://digital-vaidya-backend.herokuapp.com`
- **Save this URL!**

---

## 🌐 Frontend Deployment (Netlify)

### 1. Update netlify.toml
Open `netlify.toml` and change line 8:
```toml
to = "https://digital-vaidya-backend.herokuapp.com/api/:splat"
```
(Replace with YOUR backend URL)

### 2. Push to GitHub
```bash
cd ..
git init
git add .
git commit -m "Deploy to Netlify"
git remote add origin https://github.com/your-username/digital-vaidya.git
git push -u origin main
```

### 3. Deploy on Netlify
1. Go to: https://app.netlify.com
2. Click "Add new site" → "Import from Git"
3. Choose GitHub → Select your repo
4. Click "Deploy site"

### 4. Set Environment Variables
In Netlify Dashboard:
- Go to: **Site settings** → **Environment variables**
- Add: `VITE_GOOGLE_API_KEY` = `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`
- Click "Redeploy"

### 5. Update Backend CORS
```bash
heroku config:set FRONTEND_ORIGIN=https://your-app.netlify.app
heroku restart
```

---

## ✅ Done!

Your app is live at:
- Frontend: `https://your-app.netlify.app`
- Backend: `https://digital-vaidya-backend.herokuapp.com`

---

## 📋 Environment Variables Summary

### Backend (Heroku)
```
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV=production
SECRET_KEY=<generate-random-key>
FRONTEND_ORIGIN=https://your-app.netlify.app
```

### Frontend (Netlify)
```
VITE_GOOGLE_API_KEY=AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y
```

---

For detailed instructions, see `STEP_BY_STEP_DEPLOYMENT.md`

