# 🎯 START HERE - Deployment Guide

## Follow This Guide Step-by-Step

---

## 🔑 YOUR API KEYS (Copy These)

```
Gemini API Key:     AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
Google API Key:     AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
Firebase API Key:   AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y
```

---

## 📍 STEP 1: Deploy Backend (Heroku)

### A. Create Heroku Account
1. Go to: https://signup.heroku.com
2. Create free account

### B. Install Heroku CLI
1. Download: https://devcenter.heroku.com/articles/heroku-cli
2. Install it

### C. Deploy Backend

**Open PowerShell and run:**

```bash
# Navigate to backend
cd "D:\Digital-vaidya project\Digital_Vaidya\backend"

# Login
heroku login

# Create app (choose your own unique name)
heroku create digital-vaidya-backend

# Set environment variables
heroku config:set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")

# Deploy
git init
git add .
git commit -m "Deploy"
heroku git:remote -a digital-vaidya-backend
git push heroku main
```

**Wait 2-5 minutes, then test:**
- Open: `https://digital-vaidya-backend.herokuapp.com/api/health`
- Should show: `{"status": "ok"}`

**✅ Save your backend URL!** Example: `https://digital-vaidya-backend.herokuapp.com`

---

## 📍 STEP 2: Update netlify.toml

1. **Open file:** `netlify.toml` (in project root)
2. **Find line 8:**
   ```toml
   to = "https://your-backend-url.herokuapp.com/api/:splat"
   ```
3. **Replace with your backend URL:**
   ```toml
   to = "https://digital-vaidya-backend.herokuapp.com/api/:splat"
   ```
4. **Save the file**

---

## 📍 STEP 3: Push to GitHub

**Open PowerShell in project root and run:**

```bash
cd "D:\Digital-vaidya project\Digital_Vaidya"

# Create GitHub repo first at: https://github.com/new
# Then run:

git init
git add .
git commit -m "Deploy"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/digital-vaidya.git
git push -u origin main
```

**Replace `YOUR-USERNAME` with your GitHub username**

---

## 📍 STEP 4: Deploy Frontend (Netlify)

### A. Create Netlify Account
1. Go to: https://app.netlify.com
2. Sign up (free account)

### B. Deploy Site
1. Click "Add new site" → "Import from Git"
2. Choose "GitHub"
3. Authorize Netlify
4. Select your repository
5. Click "Deploy site"

### C. Set Environment Variable

**In Netlify Dashboard:**
1. Click on your site name
2. Go to: **Site settings** → **Environment variables**
3. Click "Add a variable"
4. Enter:
   - **Key:** `VITE_GOOGLE_API_KEY`
   - **Value:** `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`
5. Click "Save"
6. Go to **Deploys** tab
7. Click "Trigger deploy" → "Clear cache and deploy site"

**✅ Save your Netlify URL!** Example: `https://digital-vaidya.netlify.app`

---

## 📍 STEP 5: Update Backend CORS

**Back in PowerShell:**

```bash
cd backend
heroku config:set FRONTEND_ORIGIN=https://your-netlify-app.netlify.app
heroku restart
```

**Replace `your-netlify-app` with your actual Netlify app name**

---

## ✅ DONE!

Your app is live:
- **Frontend:** `https://your-app.netlify.app`
- **Backend:** `https://your-backend.herokuapp.com`

---

## 📋 Where Each Key Goes

### Backend (Heroku)
```
Dashboard: https://dashboard.heroku.com
→ Select your app
→ Settings
→ Reveal Config Vars
→ Add these:

GEMINI_API_KEY = AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY = AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV = production
SECRET_KEY = <generate-with-python>
FRONTEND_ORIGIN = https://your-app.netlify.app
```

### Frontend (Netlify)
```
Dashboard: https://app.netlify.com
→ Select your site
→ Site settings
→ Environment variables
→ Add:

VITE_GOOGLE_API_KEY = AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y
```

### Configuration File
```
File: netlify.toml (line 8)
Update: to = "https://YOUR-BACKEND-URL.herokuapp.com/api/:splat"
```

---

## 🎉 That's It!

For more detailed instructions, see:
- `DEPLOY_NOW.md` - Complete step-by-step
- `STEP_BY_STEP_DEPLOYMENT.md` - Detailed guide
- `API_KEYS_REFERENCE.md` - All keys reference

