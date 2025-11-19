# Digital Vaidya - Deployment Guide

## Overview
This guide will help you deploy the Digital Vaidya application to Netlify (frontend) and configure the backend.

## Prerequisites
- Node.js 18+ installed
- Python 3.8+ installed
- Netlify account
- Backend hosting (Heroku, Railway, Render, etc.)

## Frontend Deployment (Netlify)

### Step 1: Environment Variables in Netlify
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add the following variables:
   - `VITE_GOOGLE_API_KEY`: Your Firebase API key (AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y)
   - `VITE_API_URL`: Your backend API URL (e.g., https://your-backend.herokuapp.com)

### Step 2: Build Settings
The `netlify.toml` file is already configured with:
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

### Step 3: Deploy
1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect the build settings from `netlify.toml`
3. Click **Deploy site**

## Backend Deployment

### Step 1: Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Environment Variables
Create a `.env` file in the `backend` directory with:
```env
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
SECRET_KEY=your-secret-key-here
FLASK_ENV=production
FRONTEND_ORIGIN=https://your-netlify-app.netlify.app
```

### Step 3: Deploy Backend
#### Option A: Heroku
1. Install Heroku CLI
2. Create a `Procfile` in the backend directory:
   ```
   web: gunicorn wsgi:app
   ```
3. Deploy:
   ```bash
   heroku create your-app-name
   heroku config:set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
   heroku config:set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
   heroku config:set FRONTEND_ORIGIN=https://your-netlify-app.netlify.app
   git push heroku main
   ```

#### Option B: Railway
1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically

#### Option C: Render
1. Create a new Web Service
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `gunicorn wsgi:app`
4. Add environment variables

### Step 4: Update Frontend API URL
After deploying the backend, update the `VITE_API_URL` environment variable in Netlify to point to your backend URL.

## Important Notes

1. **CORS Configuration**: The backend is configured to accept requests from your Netlify domain. Make sure to update `FRONTEND_ORIGIN` in backend environment variables.

2. **API Proxy**: In development, Vite proxies `/api` requests to `http://localhost:8000`. In production, update `VITE_API_URL` to your backend URL.

3. **Firebase Configuration**: The Firebase config is already set up in `src/config/firebase.js`. Make sure your Firebase project allows your Netlify domain.

4. **Gemini API Key**: The provided Gemini API key is already configured. Make sure it has proper quotas and permissions.

## Testing Deployment

1. **Frontend**: Visit your Netlify URL
2. **Backend Health Check**: Visit `https://your-backend-url.com/api/health`
3. **Test API**: Try the chatbot or symptom analysis features

## Troubleshooting

### Frontend Issues
- **Build fails**: Check Node.js version (should be 18+)
- **API calls fail**: Verify `VITE_API_URL` is set correctly
- **Firebase errors**: Check Firebase configuration and domain whitelist

### Backend Issues
- **Import errors**: Make sure `google-genai` is installed: `pip install google-genai==0.2.2`
- **CORS errors**: Update `FRONTEND_ORIGIN` environment variable
- **Gemini API errors**: Verify API key is correct and has proper permissions

## Security Notes

1. Never commit `.env` files to version control
2. Use strong `SECRET_KEY` in production
3. Enable Firebase security rules
4. Monitor API usage and set rate limits

