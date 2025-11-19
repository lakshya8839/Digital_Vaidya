# API Testing Guide

## Quick API Health Check

### Test Backend Health
Open in browser or use curl:
```
http://localhost:8000/api/health
```

Should return: `{"status": "ok"}`

### Test Face Recognition API
```
http://localhost:8000/api/face/health
```

Should return: `{"status": "ok", "message": "Face recognition API is running", ...}`

### Test Chatbot API (using curl or Postman)
```bash
curl -X POST http://localhost:8000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### Test Report Generation (using curl or Postman)
```bash
curl -X POST http://localhost:8000/api/generate-summary \
  -H "Content-Type: application/json" \
  -d '{"description": "Headache", "affectedRegions": ["Head"], "healthParams": {}}'
```

## Common Issues

### Backend Not Running
**Symptom:** All API calls fail with "Failed to fetch" or network errors

**Solution:**
1. Check if backend is running: `http://localhost:8000/api/health`
2. Start backend: `cd backend && python wsgi.py`
3. Verify Gemini API key is set in `backend/.env`

### Gemini API Errors
**Symptom:** Chatbot or analysis returns errors

**Solution:**
1. Check `backend/.env` has `GEMINI_API_KEY=AIzaSyBzjXtL7pMhE35bW127Vx3kEH1du_8wmbM`
2. Check backend console for error messages
3. Verify API key is valid

### PDF Generation Fails
**Symptom:** Report download doesn't work

**Solution:**
1. Check backend console for PDF generation errors
2. Verify `reportlab` is installed: `pip install reportlab`
3. Check browser console for errors

## Debug Steps

1. **Check Backend Logs**
   - Look for error messages in the terminal where backend is running
   - Check for Python exceptions or import errors

2. **Check Browser Console**
   - Open browser DevTools (F12)
   - Check Console tab for JavaScript errors
   - Check Network tab for failed API requests

3. **Verify Environment Variables**
   - Backend `.env` file exists
   - `GEMINI_API_KEY` is set correctly
   - `FRONTEND_ORIGIN` is set to `http://localhost:5000`

4. **Test API Endpoints Directly**
   - Use browser for GET requests
   - Use Postman or curl for POST requests
   - Check response status codes and error messages

