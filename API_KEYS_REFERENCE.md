# 🔑 API Keys Reference

## All API Keys in One Place

---

## 📋 Your API Keys

### Gemini API Key (for Backend)
```
AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
```
**Used for:** AI symptom analysis, chatbot responses, health summaries

### Google API Key (for Backend - same as Gemini)
```
AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
```
**Used for:** Backend compatibility, Firebase Admin SDK

### Firebase API Key (for Frontend)
```
AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y
```
**Used for:** Frontend Firebase authentication

---

## 📍 Where to Set Each Key

### Backend Environment Variables

**Platform:** Heroku / Railway / Render

| Variable Name | Value | Purpose |
|--------------|-------|---------|
| `GEMINI_API_KEY` | `AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM` | AI symptom analysis |
| `GOOGLE_API_KEY` | `AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM` | Backend compatibility |
| `FLASK_ENV` | `production` | Flask environment |
| `SECRET_KEY` | Generate with Python | Flask secret key |
| `FRONTEND_ORIGIN` | `https://your-app.netlify.app` | CORS configuration |

**How to Set (Heroku):**
```bash
heroku config:set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=<generate-key>
heroku config:set FRONTEND_ORIGIN=https://your-app.netlify.app
```

**How to Set (Railway/Render):**
- Go to dashboard → Variables/Environment section
- Add each variable manually

---

### Frontend Environment Variables

**Platform:** Netlify

| Variable Name | Value | Purpose |
|--------------|-------|---------|
| `VITE_GOOGLE_API_KEY` | `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y` | Firebase authentication |

**How to Set (Netlify):**
1. Go to Netlify Dashboard
2. Select your site
3. Go to: **Site settings** → **Environment variables**
4. Click "Add a variable"
5. Key: `VITE_GOOGLE_API_KEY`
6. Value: `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`
7. Click "Save"
8. Redeploy site

---

## 🔧 Configuration Files

### netlify.toml
**File:** `netlify.toml` (project root)
**Line 8:** Update with your backend URL
```toml
to = "https://your-backend-url.herokuapp.com/api/:splat"
```

### Backend .env (Local Development)
**File:** `backend/.env` (for local testing only)
```env
GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
FLASK_ENV=development
FRONTEND_ORIGIN=http://localhost:5000
SECRET_KEY=dev-secret-key-local
```

---

## ✅ Verification Checklist

### Backend
- [ ] `GEMINI_API_KEY` set in Heroku/Railway/Render
- [ ] `GOOGLE_API_KEY` set in Heroku/Railway/Render
- [ ] `FLASK_ENV` set to `production`
- [ ] `SECRET_KEY` generated and set
- [ ] `FRONTEND_ORIGIN` set (after frontend deploy)

### Frontend
- [ ] `VITE_GOOGLE_API_KEY` set in Netlify
- [ ] `netlify.toml` updated with backend URL
- [ ] Site redeployed after setting variables

---

## 🧪 Test Your Keys

### Test Gemini API (Backend)
```bash
# After deploying backend
curl https://your-backend.herokuapp.com/api/chatbot \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### Test Firebase (Frontend)
- Open your Netlify site
- Try to login/register
- Should work if key is set correctly

---

## 🔒 Security Notes

1. **Never commit API keys to Git**
   - `.env` files are in `.gitignore`
   - Only set keys in hosting platform dashboards

2. **Rotate keys if exposed**
   - If keys are accidentally committed, rotate them immediately

3. **Use different keys for production**
   - Consider creating separate API keys for production vs development

---

## 📞 Quick Reference

**Backend URL Format:**
- Heroku: `https://your-app-name.herokuapp.com`
- Railway: `https://your-app.up.railway.app`
- Render: `https://your-app.onrender.com`

**Frontend URL Format:**
- Netlify: `https://your-app.netlify.app`

---

All keys are ready to use! Just copy and paste them into the respective platforms.

