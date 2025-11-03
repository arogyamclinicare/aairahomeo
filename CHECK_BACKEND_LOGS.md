# 🔍 Check Backend Logs - Quick Guide

## How to Check Backend Server Logs

### Option 1: Check if Server is Running

**In PowerShell:**
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000
```

**If you see output** → Server is running ✅  
**If no output** → Server is not running ❌

---

### Option 2: Start Backend and See Logs

**Step 1: Open PowerShell in `backend` folder**
```powershell
cd backend
```

**Step 2: Start server**
```powershell
npm start
```

**You should see:**
```
🚀 Appointment API server running on port 5000
📧 Email notifications: Configured (Resend)
🔗 API endpoint: http://localhost:5000/newAppointment
🔗 Health check: http://localhost:5000/api/health
```

**If you see errors:**
- ❌ "Cannot find module" → Run `npm install`
- ❌ "EADDRINUSE" → Port 5000 is already in use
- ❌ "RESEND_API_KEY not configured" → Check `.env` file

---

### Option 3: Test Backend Manually

**Open browser or use PowerShell:**
```powershell
# Test health check
Invoke-WebRequest -Uri http://localhost:5000/api/health -Method GET

# Or use curl
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "Appointment API is running",
  "timestamp": "2025-01-03T..."
}
```

---

### Option 4: Check Console Output When Form is Submitted

1. **Keep backend running** (see Option 2)
2. **Submit a test appointment** on your website
3. **Watch the backend console** - you should see:
   - ✅ "Email sent successfully" → Email worked!
   - ❌ Error messages → Check what failed

---

## Common Issues & Logs

### Error: "Cannot find module 'resend'"
**Fix:**
```powershell
cd backend
npm install
```

### Error: "Port 5000 already in use"
**Fix:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change PORT in backend/.env
PORT=5001
```

### Error: "RESEND_API_KEY not configured"
**Fix:**
1. Check `backend/.env` file exists
2. Check it has: `RESEND_API_KEY=re_...`
3. Restart backend server

### Error: "Supabase connection failed"
**Fix:**
1. Check `backend/.env` has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
2. Verify keys are correct

---

## Quick Health Check

**Run this to test everything:**
```powershell
# 1. Check backend is running
curl http://localhost:5000/api/health

# 2. Test form submission (if backend is running)
# Submit test appointment on website
# Check backend console for logs
```

---

## What Logs to Look For

**✅ Good logs:**
- "🚀 Appointment API server running on port 5000"
- "📧 Email notifications: Configured (Resend)"
- "✅ Email sent successfully"

**❌ Bad logs:**
- "RESEND_API_KEY not configured"
- "Failed to send email"
- "Supabase error"
- "Cannot find module"

---

**Tell me what logs you see and I'll help fix it!** 🔧

