# 🚀 DEPLOY NOW - Complete Step-by-Step Guide

## Follow These Steps Exactly

---

## 📦 PART 1: BACKEND DEPLOYMENT (Heroku)

### Step 1: Install Heroku CLI
1. Go to: https://devcenter.heroku.com/articles/heroku-cli
2. Download and install Heroku CLI
3. Or run: `winget install Heroku.HerokuCLI`

### Step 2: Login to Heroku
Open PowerShell/Command Prompt and run:
```bash
heroku login
```
- This will open a browser - login with your Heroku account
- If you don't have an account, create one at: https://signup.heroku.com

### Step 3: Navigate to Backend Folder
```bash
cd "D:\Digital-vaidya project\Digital_Vaidya\backend"
```

### Step 4: Create Heroku App
```bash
heroku create digital-vaidya-backend
```
**Note:** Replace `digital-vaidya-backend` with your own unique name (must be unique globally)

**Save your app URL!** It will be: `https://digital-vaidya-backend.herokuapp.com`

### Step 5: Set Environment Variables

**Run these commands ONE BY ONE:**

```bash
heroku config:set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
```

```bash
heroku config:set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
```

```bash
heroku config:set FLASK_ENV=production
```

**Generate Secret Key:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```
Copy the output (it will be a long random string), then run:
```bash
heroku config:set SECRET_KEY=<paste-the-generated-key-here>
```

**Set Frontend Origin (update this after deploying frontend):**
```bash
heroku config:set FRONTEND_ORIGIN=https://your-app.netlify.app
```

### Step 6: Deploy Backend

```bash
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a digital-vaidya-backend
git push heroku main
```

**Wait 2-5 minutes for deployment to complete**

### Step 7: Test Backend

1. **Check if it's running:**
   - Open browser: `https://digital-vaidya-backend.herokuapp.com/api/health`
   - Should show: `{"status": "ok"}`

2. **Check logs if there are errors:**
   ```bash
   heroku logs --tail
   ```

3. **Save your backend URL:**
   - Example: `https://digital-vaidya-backend.herokuapp.com`
   - **You'll need this for the frontend!**

---

## 🌐 PART 2: FRONTEND DEPLOYMENT (Netlify)

### Step 1: Update netlify.toml

1. **Open the file:** `netlify.toml` (in project root)
2. **Find line 8:**
   ```toml
   to = "https://your-backend-url.herokuapp.com/api/:splat"
   ```
3. **Replace `your-backend-url.herokuapp.com`** with your actual backend URL
   - Example: `to = "https://digital-vaidya-backend.herokuapp.com/api/:splat"`
4. **Save the file**

### Step 2: Push Code to GitHub

1. **Create GitHub Repository:**
   - Go to: https://github.com/new
   - Repository name: `digital-vaidya` (or any name)
   - **Don't** check "Initialize with README"
   - Click "Create repository"

2. **Push Your Code:**
   ```bash
   cd "D:\Digital-vaidya project\Digital_Vaidya"
   git init
   git add .
   git commit -m "Deploy to Netlify"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/digital-vaidya.git
   git push -u origin main
   ```
   **Replace `YOUR-USERNAME` with your GitHub username**

### Step 3: Deploy on Netlify

1. **Go to Netlify:**
   - Visit: https://app.netlify.com
   - Sign up/Login (free account works)

2. **Import Your Project:**
   - Click "Add new site" button
   - Click "Import an existing project"
   - Click "Deploy with GitHub"
   - Authorize Netlify to access GitHub
   - Select your repository: `digital-vaidya`
   - Click "Deploy site"

3. **Wait for deployment** (takes 1-3 minutes)

### Step 4: Set Environment Variables in Netlify

1. **After deployment starts, click on your site name**

2. **Go to Site Settings:**
   - Click "Site settings" (in top menu)
   - Click "Environment variables" (in left sidebar)

3. **Add Environment Variable:**
   - Click "Add a variable" button
   - **Key:** `VITE_GOOGLE_API_KEY`
   - **Value:** `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`
   - Click "Save"

4. **Redeploy:**
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"
   - Wait for redeployment

### Step 5: Get Your Netlify URL

1. **After deployment, note your site URL:**
   - Example: `https://digital-vaidya.netlify.app`
   - Or: `https://random-name-12345.netlify.app`
   - **Save this URL!**

### Step 6: Update Backend CORS

**Go back to PowerShell and run:**
```bash
cd backend
heroku config:set FRONTEND_ORIGIN=https://your-netlify-app.netlify.app
```
**Replace `your-netlify-app` with your actual Netlify app name**

```bash
heroku restart
```

---

## ✅ PART 3: VERIFICATION

### Test Your Deployment

1. **Test Backend:**
   - Open: `https://your-backend.herokuapp.com/api/health`
   - Should return: `{"status": "ok"}`

2. **Test Frontend:**
   - Open: `https://your-app.netlify.app`
   - Should show login page

3. **Test Features:**
   - Try logging in
   - Test symptom analysis
   - Test chatbot
   - Test report generation

---

## 📋 QUICK REFERENCE: All API Keys

### Backend (Heroku Dashboard or CLI)
```
GEMINI_API_KEY = AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY = AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV = production
SECRET_KEY = <generate-with-python-command>
FRONTEND_ORIGIN = https://your-app.netlify.app
```

### Frontend (Netlify Dashboard)
```
VITE_GOOGLE_API_KEY = AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y
```

---

## 🎯 Where to Set Each Key

### Backend Keys → Heroku Dashboard
1. Go to: https://dashboard.heroku.com
2. Select your app
3. Click "Settings"
4. Click "Reveal Config Vars"
5. Add each variable:
   - Click "Add"
   - Enter key name
   - Enter value
   - Click "Add"

**OR use CLI commands (shown above)**

### Frontend Keys → Netlify Dashboard
1. Go to: https://app.netlify.com
2. Select your site
3. Click "Site settings"
4. Click "Environment variables"
5. Click "Add a variable"
6. Enter:
   - Key: `VITE_GOOGLE_API_KEY`
   - Value: `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`
7. Click "Save"
8. Redeploy site

---

## 🔧 Configuration File to Update

### netlify.toml (Line 8)
**Before:**
```toml
to = "https://your-backend-url.herokuapp.com/api/:splat"
```

**After (replace with your backend URL):**
```toml
to = "https://digital-vaidya-backend.herokuapp.com/api/:splat"
```

---

## ✅ Final Checklist

### Backend
- [ ] Heroku account created
- [ ] Heroku app created
- [ ] `GEMINI_API_KEY` set
- [ ] `GOOGLE_API_KEY` set
- [ ] `FLASK_ENV` set to `production`
- [ ] `SECRET_KEY` generated and set
- [ ] Backend deployed successfully
- [ ] Backend URL saved
- [ ] Health check works: `/api/health`

### Frontend
- [ ] Code pushed to GitHub
- [ ] Netlify account created
- [ ] Site connected to GitHub
- [ ] `netlify.toml` updated with backend URL
- [ ] `VITE_GOOGLE_API_KEY` set in Netlify
- [ ] Site redeployed
- [ ] Frontend URL saved

### Final Steps
- [ ] `FRONTEND_ORIGIN` updated in backend
- [ ] Backend restarted
- [ ] Tested all features
- [ ] Tested on mobile

---

## 🎉 Success!

Your app is now live at:
- **Frontend:** `https://your-app.netlify.app`
- **Backend:** `https://your-backend.herokuapp.com`

Both are fully functional and ready to use!

---

## 🆘 Need Help?

### Backend Issues
- Check logs: `heroku logs --tail`
- Verify all environment variables are set
- Make sure `Procfile` exists

### Frontend Issues
- Check Netlify deploy logs
- Verify environment variables are set
- Make sure `netlify.toml` has correct backend URL
- Redeploy after setting variables

### Common Errors
- **CORS errors:** Update `FRONTEND_ORIGIN` in backend
- **API errors:** Check backend is running
- **Build errors:** Check Node.js version (should be 18+)

---

For more details, see:
- `STEP_BY_STEP_DEPLOYMENT.md` - Detailed guide
- `QUICK_DEPLOY.md` - Fast track
- `API_KEYS_REFERENCE.md` - All keys reference

