# 📝 Copy-Paste Deployment Commands

## All Commands in One Place

---

## 🔧 Backend Deployment (Heroku)

### Step 1: Setup
```bash
# Navigate to backend
cd backend

# Login to Heroku
heroku login

# Create app (replace 'digital-vaidya-backend' with your name)
heroku create digital-vaidya-backend
```

### Step 2: Set Environment Variables
```bash
# Set Gemini API Key
heroku config:set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM

# Set Google API Key
heroku config:set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM

# Set Flask environment
heroku config:set FLASK_ENV=production

# Generate and set secret key
python -c "import secrets; print(secrets.token_hex(32))"
# Copy the output and use it below:
heroku config:set SECRET_KEY=<paste-generated-key-here>

# Set frontend origin (update after deploying frontend)
heroku config:set FRONTEND_ORIGIN=https://your-app.netlify.app
```

### Step 3: Deploy
```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Deploy backend"

# Add Heroku remote
heroku git:remote -a digital-vaidya-backend

# Deploy
git push heroku main
```

### Step 4: Verify
```bash
# Check logs
heroku logs --tail

# Test health endpoint
# Open in browser: https://digital-vaidya-backend.herokuapp.com/api/health
```

---

## 🌐 Frontend Deployment (Netlify)

### Step 1: Update Configuration
1. Open `netlify.toml`
2. Change line 8 to your backend URL:
   ```toml
   to = "https://digital-vaidya-backend.herokuapp.com/api/:splat"
   ```

### Step 2: Push to GitHub
```bash
# Go to project root
cd ..

# Initialize git (if not done)
git init
git add .
git commit -m "Deploy frontend"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/your-username/digital-vaidya.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Netlify
1. Go to: https://app.netlify.com
2. Click "Add new site" → "Import from Git"
3. Choose GitHub
4. Select your repository
5. Click "Deploy site"

### Step 4: Set Environment Variables in Netlify Dashboard
1. Go to: **Site settings** → **Environment variables**
2. Click "Add a variable"
3. Add:
   - Key: `VITE_GOOGLE_API_KEY`
   - Value: `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`
4. Click "Save"
5. Go to **Deploys** tab
6. Click "Trigger deploy" → "Clear cache and deploy site"

### Step 5: Update Backend CORS
```bash
# Update frontend origin in backend
heroku config:set FRONTEND_ORIGIN=https://your-app.netlify.app

# Restart backend
heroku restart
```

---

## 🔄 Alternative: Railway Backend

### Setup
1. Go to: https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Select `backend` folder

### Environment Variables (in Railway Dashboard)
Go to **Variables** tab and add:
```
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV=production
SECRET_KEY=<generate-random-key>
FRONTEND_ORIGIN=https://your-app.netlify.app
```

---

## 🔄 Alternative: Render Backend

### Setup
1. Go to: https://render.com
2. Click "New" → "Web Service"
3. Connect GitHub repository

### Configuration
- **Name:** `digital-vaidya-backend`
- **Root Directory:** `backend`
- **Environment:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `gunicorn wsgi:app`

### Environment Variables (in Render Dashboard)
Add in **Environment** section:
```
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV=production
SECRET_KEY=<generate-random-key>
FRONTEND_ORIGIN=https://your-app.netlify.app
```

---

## 📋 All API Keys Reference

```
GEMINI_API_KEY: AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY: AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
VITE_GOOGLE_API_KEY: AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y
```

---

## ✅ Quick Verification

### Backend
```bash
# Test health
curl https://your-backend.herokuapp.com/api/health

# Should return: {"status": "ok"}
```

### Frontend
- Visit: `https://your-app.netlify.app`
- Should show login page
- Test all features

---

## 🆘 Quick Fixes

### Backend not working?
```bash
heroku logs --tail
# Check for errors
```

### Frontend not connecting to backend?
1. Check `netlify.toml` has correct backend URL
2. Verify backend is running
3. Check CORS settings

### Environment variables not working?
1. Redeploy after setting variables
2. Clear cache and redeploy
3. Verify variable names are correct

---

For detailed step-by-step instructions, see `STEP_BY_STEP_DEPLOYMENT.md`

