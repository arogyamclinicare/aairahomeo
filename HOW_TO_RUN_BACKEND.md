# 🚀 How to Run the Backend Server

## ⚠️ Error: `ERR_CONNECTION_REFUSED`

This error means your **backend server is not running**. The frontend is trying to connect to `http://localhost:5000` but nothing is listening there.

---

## ✅ Quick Fix: Start the Backend

### Option 1: Using npm (Recommended)

1. **Open a new terminal/PowerShell window**
2. **Navigate to backend folder:**
   ```powershell
   cd backend
   ```

3. **Start the server:**
   ```powershell
   npm start
   ```

4. **You should see:**
   ```
   🚀 Appointment API server running on port 5000
   📧 Email notifications: Configured (Resend)
   🔗 API endpoint: http://localhost:5000/newAppointment
   ```

5. **Keep this terminal window open** - the server needs to keep running!

---

### Option 2: Using node directly

```powershell
cd backend
node server.js
```

---

## ✅ Verify It's Working

1. **Open your browser**
2. **Visit:** `http://localhost:5000/api/health`
3. **You should see:**
   ```json
   {
     "status": "ok",
     "message": "Appointment API is running"
   }
   ```

If you see this, backend is running! ✅

---

## 🔄 How to Run Both Frontend + Backend

You need **2 terminal windows**:

### Terminal 1: Frontend (Vite)
```powershell
npm run dev
```
- This runs your React website on `http://localhost:5173` (or similar)

### Terminal 2: Backend (Node.js)
```powershell
cd backend
npm start
```
- This runs your API server on `http://localhost:5000`

**Both must run at the same time!**

---

## ⚠️ Common Issues

### "Port 5000 already in use"

**Fix:** Change the port in `backend/.env`:
```env
PORT=5001
```

Then update `.env` (frontend root):
```env
VITE_API_URL=http://localhost:5001
```

Restart both frontend and backend.

---

### "Cannot find module"

**Fix:** Install dependencies:
```powershell
cd backend
npm install
```

---

### "Email not sending"

**Fix:** Check `backend/.env` has all variables:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `ADMIN_EMAIL`
- `PORT`

---

## 📝 Quick Checklist

- [ ] Backend folder has `node_modules` (run `npm install` if not)
- [ ] `backend/.env` file exists with all variables
- [ ] Backend server is running (`npm start` in backend folder)
- [ ] Terminal shows "Appointment API server running on port 5000"
- [ ] `http://localhost:5000/api/health` returns JSON
- [ ] Frontend is also running (`npm run dev` in root folder)

---

## 🎯 After Deployment to Railway

Once you deploy to Railway (see `DEPLOY_BACKEND_EASY.md`):

1. **You won't need to run backend locally anymore**
2. **Update Vercel** with Railway URL
3. **Forms will work automatically** in production

---

## 🆘 Still Not Working?

1. **Check backend terminal** for error messages
2. **Check `backend/.env`** exists and has all variables
3. **Try restarting** both frontend and backend
4. **Check port 5000** is not used by another app

---

**Need help?** Share the error message from the backend terminal! 😊

