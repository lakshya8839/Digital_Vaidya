# Quick Start Guide - Digital Vaidya

## 🎯 Gemini API Key
**Key**: `AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM`

This key is already configured in the codebase and ready to use.

## 📦 Installation

### Frontend
```bash
npm install
npm run dev  # Development
npm run build  # Production build
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python wsgi.py  # Development
```

## 🌐 Deployment Checklist

### Frontend (Netlify)
- [ ] Push code to GitHub
- [ ] Connect to Netlify
- [ ] Set `VITE_GOOGLE_API_KEY=AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`
- [ ] Update `netlify.toml` line 8 with backend URL
- [ ] Deploy

### Backend (Heroku/Railway/Render)
- [ ] Set `GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM`
- [ ] Set `GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM`
- [ ] Set `FRONTEND_ORIGIN=https://your-netlify-app.netlify.app`
- [ ] Set `SECRET_KEY=<generate-random-key>`
- [ ] Deploy

## 🔗 Important URLs to Update

1. **netlify.toml** (line 8): Update backend URL
2. **Backend CORS**: Set `FRONTEND_ORIGIN` to your Netlify URL

## ✅ All Set!

Your application is ready to deploy. See `DEPLOYMENT.md` for detailed instructions.

