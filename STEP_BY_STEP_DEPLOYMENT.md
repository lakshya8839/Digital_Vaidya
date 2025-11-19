# 🚀 Step-by-Step Deployment Guide

## Complete Deployment Instructions with API Keys

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ GitHub account
- ✅ Netlify account (free tier works)
- ✅ Heroku/Railway/Render account (for backend)
- ✅ Git installed on your computer

---

## 🔑 API Keys You'll Need

### Gemini API Key (Already Provided)
```
AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
```

### Firebase API Key (Already Provided)
```
AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y
```

---

## PART 1: Backend Deployment (Heroku)

### Step 1: Prepare Backend for Deployment

1. **Make sure you're in the project directory:**
   ```bash
   cd "D:\Digital-vaidya project\Digital_Vaidya"
   ```

2. **Verify backend files exist:**
   - ✅ `backend/requirements.txt`
   - ✅ `backend/Procfile`
   - ✅ `backend/wsgi.py`
   - ✅ `backend/app/` folder

### Step 2: Create Heroku App

1. **Install Heroku CLI** (if not installed):
   - Download from: https://devcenter.heroku.com/articles/heroku-cli
   - Or use: `winget install Heroku.HerokuCLI`

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create a new Heroku app:**
   ```bash
   cd backend
   heroku create your-app-name
   ```
   Example: `heroku create digital-vaidya-backend`
   
   **Note:** Replace `your-app-name` with your desired app name (must be unique)

4. **Note your Heroku app URL:**
   - It will be: `https://your-app-name.herokuapp.com`
   - **Save this URL** - you'll need it for frontend configuration

### Step 3: Set Environment Variables in Heroku

Run these commands one by one:

```bash
heroku config:set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=your-strong-secret-key-here
```

**Generate a strong SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```
Then use the output as your SECRET_KEY.

**Set FRONTEND_ORIGIN** (update after deploying frontend):
```bash
heroku config:set FRONTEND_ORIGIN=https://your-netlify-app.netlify.app
```

### Step 4: Deploy Backend to Heroku

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Add Heroku remote:**
   ```bash
   heroku git:remote -a your-app-name
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```
   (If you get an error, try: `git push heroku master`)

4. **Wait for deployment** (takes 2-5 minutes)

5. **Test your backend:**
   - Open: `https://your-app-name.herokuapp.com/api/health`
   - Should return: `{"status": "ok"}`

### Step 5: Verify Backend is Working

1. **Check logs:**
   ```bash
   heroku logs --tail
   ```

2. **Test face recognition:**
   - Open: `https://your-app-name.herokuapp.com/api/face/health`
   - Should show face recognition status

3. **Note your backend URL:**
   - Example: `https://digital-vaidya-backend.herokuapp.com`
   - **You'll need this for frontend configuration**

---

## PART 2: Frontend Deployment (Netlify)

### Step 1: Prepare Frontend Code

1. **Make sure you're in the project root:**
   ```bash
   cd "D:\Digital-vaidya project\Digital_Vaidya"
   ```

2. **Update netlify.toml with your backend URL:**
   - Open `netlify.toml`
   - Find line 8: `to = "https://your-backend-url.herokuapp.com/api/:splat"`
   - Replace `your-backend-url.herokuapp.com` with your actual Heroku app URL
   - Example: `to = "https://digital-vaidya-backend.herokuapp.com/api/:splat"`

3. **Test build locally (optional):**
   ```bash
   npm run build
   ```
   - This creates a `dist/` folder
   - You can test it with: `npm run preview`

### Step 2: Push Code to GitHub

1. **Create a GitHub repository:**
   - Go to: https://github.com/new
   - Name it: `digital-vaidya` (or any name)
   - Don't initialize with README
   - Click "Create repository"

2. **Push your code:**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/your-username/digital-vaidya.git
   git push -u origin main
   ```
   Replace `your-username` with your GitHub username

### Step 3: Connect to Netlify

1. **Go to Netlify:**
   - Visit: https://app.netlify.com
   - Sign up/Login (free account works)

2. **Add New Site:**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access GitHub
   - Select your repository: `digital-vaidya`

3. **Configure Build Settings:**
   - Netlify should auto-detect from `netlify.toml`
   - Verify:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

### Step 4: Set Environment Variables in Netlify

1. **Go to Site Settings:**
   - After deployment starts, click on your site
   - Go to: **Site settings** → **Environment variables**

2. **Add Environment Variables:**
   Click "Add a variable" for each:

   **Variable 1:**
   - Key: `VITE_GOOGLE_API_KEY`
   - Value: `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`
   - Click "Save"

   **Variable 2 (Optional):**
   - Key: `VITE_API_URL`
   - Value: `https://your-app-name.herokuapp.com`
   - Replace `your-app-name` with your Heroku app name
   - Click "Save"

3. **Redeploy:**
   - Go to **Deploys** tab
   - Click "Trigger deploy" → "Clear cache and deploy site"

### Step 5: Update Backend CORS

1. **Go back to Heroku:**
   ```bash
   heroku config:set FRONTEND_ORIGIN=https://your-netlify-app.netlify.app
   ```
   Replace `your-netlify-app` with your actual Netlify app name

2. **Restart Heroku app:**
   ```bash
   heroku restart
   ```

### Step 6: Verify Frontend is Working

1. **Visit your Netlify URL:**
   - Example: `https://digital-vaidya.netlify.app`
   - Should show the login page

2. **Test the application:**
   - Try logging in
   - Test symptom analysis
   - Test chatbot
   - Test report generation

---

## 🔄 Alternative: Backend on Railway

### Step 1: Create Railway Account
- Go to: https://railway.app
- Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Select the `backend` folder

### Step 3: Set Environment Variables
In Railway dashboard, go to **Variables** tab and add:

```
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV=production
SECRET_KEY=your-strong-secret-key-here
FRONTEND_ORIGIN=https://your-netlify-app.netlify.app
```

### Step 4: Deploy
- Railway will auto-detect `Procfile`
- Deployment starts automatically
- Note your Railway URL (e.g., `https://your-app.up.railway.app`)

---

## 🔄 Alternative: Backend on Render

### Step 1: Create Render Account
- Go to: https://render.com
- Sign up with GitHub

### Step 2: Create New Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Select the repository

### Step 3: Configure Service
- **Name:** `digital-vaidya-backend`
- **Root Directory:** `backend`
- **Environment:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `gunicorn wsgi:app`

### Step 4: Set Environment Variables
In **Environment** section, add:

```
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV=production
SECRET_KEY=your-strong-secret-key-here
FRONTEND_ORIGIN=https://your-netlify-app.netlify.app
```

### Step 5: Deploy
- Click "Create Web Service"
- Wait for deployment
- Note your Render URL

---

## 📝 Quick Reference: All Environment Variables

### Backend (Heroku/Railway/Render)

| Variable | Value | Where to Set |
|----------|-------|--------------|
| `GEMINI_API_KEY` | `AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM` | Heroku: `heroku config:set`<br>Railway: Variables tab<br>Render: Environment section |
| `GOOGLE_API_KEY` | `AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM` | Same as above |
| `FLASK_ENV` | `production` | Same as above |
| `SECRET_KEY` | Generate with: `python -c "import secrets; print(secrets.token_hex(32))"` | Same as above |
| `FRONTEND_ORIGIN` | `https://your-netlify-app.netlify.app` | Same as above (update after frontend deploy) |

### Frontend (Netlify)

| Variable | Value | Where to Set |
|----------|-------|--------------|
| `VITE_GOOGLE_API_KEY` | `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y` | Netlify Dashboard → Site Settings → Environment Variables |
| `VITE_API_URL` | `https://your-backend-url.herokuapp.com` | Same (optional, if not using netlify.toml redirects) |

---

## 🔧 Configuration Files to Update

### 1. netlify.toml (Line 8)
```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR-BACKEND-URL.herokuapp.com/api/:splat"
  status = 200
  force = true
```
**Replace `YOUR-BACKEND-URL` with your actual backend URL**

### 2. Backend CORS (After Frontend Deploy)
Update `FRONTEND_ORIGIN` in backend environment variables with your Netlify URL

---

## ✅ Deployment Checklist

### Backend
- [ ] Heroku/Railway/Render account created
- [ ] Backend app created
- [ ] All environment variables set
- [ ] Backend deployed successfully
- [ ] Backend health check works: `/api/health`
- [ ] Backend URL saved

### Frontend
- [ ] Code pushed to GitHub
- [ ] Netlify account created
- [ ] Site connected to GitHub
- [ ] `netlify.toml` updated with backend URL
- [ ] Environment variables set in Netlify
- [ ] Site deployed successfully
- [ ] Frontend URL saved

### Final Steps
- [ ] Backend `FRONTEND_ORIGIN` updated with Netlify URL
- [ ] Backend restarted
- [ ] Tested login
- [ ] Tested symptom analysis
- [ ] Tested chatbot
- [ ] Tested report generation
- [ ] Tested on mobile device

---

## 🧪 Testing After Deployment

### Test Backend
1. Health check: `https://your-backend.herokuapp.com/api/health`
2. Face recognition: `https://your-backend.herokuapp.com/api/face/health`

### Test Frontend
1. Visit: `https://your-app.netlify.app`
2. Test login/registration
3. Test symptom analysis
4. Test chatbot
5. Test report generation
6. Test on mobile device

---

## 🆘 Troubleshooting

### Backend Issues
- **Build fails:** Check `requirements.txt` has all packages
- **App crashes:** Check Heroku logs: `heroku logs --tail`
- **API errors:** Verify environment variables are set correctly

### Frontend Issues
- **Build fails:** Check Node.js version (should be 18+)
- **API calls fail:** Verify `netlify.toml` has correct backend URL
- **Environment variables not working:** Redeploy after setting variables

### Common Errors
- **CORS errors:** Update `FRONTEND_ORIGIN` in backend
- **API key errors:** Double-check environment variables are set correctly
- **404 errors:** Check `netlify.toml` redirects are correct

---

## 📞 Need Help?

If you encounter issues:
1. Check the logs (Heroku: `heroku logs --tail`, Netlify: Deploy logs)
2. Verify all environment variables are set
3. Check that backend URL in `netlify.toml` matches your actual backend URL
4. Ensure `FRONTEND_ORIGIN` in backend matches your Netlify URL exactly

---

## 🎉 Success!

Once deployed, your application will be live at:
- **Frontend:** `https://your-app.netlify.app`
- **Backend:** `https://your-backend.herokuapp.com`

Both are fully functional and mobile responsive!

