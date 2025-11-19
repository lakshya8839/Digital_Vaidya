# Environment Variables Setup Guide

## Frontend Environment Variables (Netlify)

Set these in your Netlify dashboard under **Site settings** > **Environment variables**:

### Required Variables:
- `VITE_GOOGLE_API_KEY`: Your Firebase API key
  - Value: `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`

### Optional Variables:
- `VITE_API_URL`: Your backend API URL (if not using Netlify redirects)
  - Example: `https://your-backend.herokuapp.com`

## Backend Environment Variables

Set these in your backend hosting platform (Heroku, Railway, Render, etc.):

### Required Variables:
- `GEMINI_API_KEY`: Your Gemini API key
  - Value: `AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM`
- `GOOGLE_API_KEY`: Same as GEMINI_API_KEY (for compatibility)
  - Value: `AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM`
- `FRONTEND_ORIGIN`: Your Netlify frontend URL
  - Example: `https://your-app.netlify.app`
- `SECRET_KEY`: Flask secret key (generate a strong random string)
  - Example: Generate using: `python -c "import secrets; print(secrets.token_hex(32))"`

### Optional Variables (for Firebase Admin):
- `FIREBASE_PRIVATE_KEY_ID`: Firebase private key ID
- `FIREBASE_PRIVATE_KEY`: Firebase private key (replace `\n` with actual newlines)
- `FIREBASE_CLIENT_EMAIL`: Firebase client email
- `FIREBASE_CLIENT_ID`: Firebase client ID

## Quick Setup Commands

### For Heroku Backend:
```bash
heroku config:set GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set GOOGLE_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM
heroku config:set FRONTEND_ORIGIN=https://your-app.netlify.app
heroku config:set SECRET_KEY=$(python -c "import secrets; print(secrets.token_hex(32))")
```

### For Netlify Frontend:
1. Go to Site settings > Environment variables
2. Add `VITE_GOOGLE_API_KEY` with value: `AIzaSyDBYqOcBsWeNqM3Vi4HGJUCEinkhqZPV7Y`
3. Update `netlify.toml` redirect URL to your backend URL

## Important Notes

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Update `netlify.toml`** - Replace `your-backend-url.herokuapp.com` with your actual backend URL
3. **CORS Configuration** - Make sure `FRONTEND_ORIGIN` in backend matches your Netlify URL exactly
4. **API Key Security** - Keep your API keys secure and rotate them if exposed

