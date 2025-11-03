# 🎯 SIMPLEST Resend Setup - Node.js Backend

**Use your existing Node.js backend with Resend - Much simpler than Supabase Edge Functions!**

---

## ✅ What You Get

- **Form submits** → Node.js backend saves to Supabase
- **Automatically sends email** via Resend
- **You get email** at `aairahomeobihar@gmail.com` 📧

**No Edge Functions, no triggers, just simple code!**

---

## 🚀 Setup (3 Steps, 5 Minutes!)

### Step 1: Get Resend API Key (2 minutes)

1. Go to [https://resend.com](https://resend.com)
2. **Sign up** (FREE - no credit card)
3. Go to **API Keys** → **Create API Key**
4. **Name:** `Aaira Homeo Backend`
5. **Copy the key** (starts with `re_...`)
   - ⚠️ Save it! You only see it once!

---

### Step 2: Configure Backend (1 minute)

1. **Go to `backend` folder** in your project
2. **Create `.env` file** (if it doesn't exist)
3. **Add these variables:**

```env
# Supabase
SUPABASE_URL=https://gzdnefbqxmgjdoztozov.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Resend
RESEND_API_KEY=re_your_api_key_here

# Email
ADMIN_EMAIL=aairahomeobihar@gmail.com

# Server
PORT=5000
```

**Replace:**
- `your_service_role_key_here` → Get from Supabase Dashboard → Settings → API → service_role key
- `re_your_api_key_here` → Your Resend API key from Step 1

---

### Step 3: Start Backend Server (1 minute)

1. **Open terminal** in the `backend` folder
2. **Run:**

```bash
npm install
npm start
```

3. **You should see:**
```
🚀 Appointment API server running on port 5000
📧 Email notifications: Configured (Resend)
🔗 API endpoint: http://localhost:5000/newAppointment
```

✅ **Backend is running!**

---

### Step 4: Start Frontend

1. **Open another terminal** in the root folder
2. **Run:**

```bash
npm run dev
```

3. **Test it:**
   - Submit a test appointment
   - Check email: `aairahomeobihar@gmail.com`
   - You should receive email! 🎉

---

## ✅ That's It!

**No Supabase Edge Functions, no triggers, no complex setup!**

Just:
1. ✅ Get Resend API key
2. ✅ Add to backend `.env`
3. ✅ Start backend server
4. ✅ Done!

---

## 🎯 How It Works

```
User submits form
    ↓
Frontend → Calls Node.js backend (http://localhost:5000/newAppointment)
    ↓
Backend saves to Supabase
    ↓
Backend sends email via Resend
    ↓
You receive email! 📧
```

---

## 🔧 Troubleshooting

### "Cannot connect to server"

- **Backend not running?** → Start it: `cd backend && npm start`
- **Wrong port?** → Check backend is on port 5000
- **Check `.env`** → Make sure `PORT=5000`

### "Email not received"

1. **Check backend terminal** → Look for errors
2. **Check Resend API key** → Is it correct in `.env`?
3. **Check Resend dashboard** → [resend.com/emails](https://resend.com/emails)
4. **Check spam folder** → First emails sometimes go to spam

### "RESEND_API_KEY not configured"

- Check `backend/.env` file exists
- Check `RESEND_API_KEY=re_...` is there
- Restart backend server after adding it

---

## 💰 Cost

**FREE!**
- Resend: 3000 emails/month free
- Node.js backend: Free to run (use Railway/Render/Heroku for hosting)

---

## 🚀 Deploy Backend (Optional)

When ready to deploy:

**Railway (Recommended - FREE):**
1. Sign up at [railway.app](https://railway.app)
2. Connect GitHub repo
3. Select `backend` folder
4. Add environment variables
5. Deploy!

**Or Render:**
1. Sign up at [render.com](https://render.com)
2. Create Web Service
3. Connect GitHub repo
4. Set root directory: `backend`
5. Add environment variables
6. Deploy!

---

## 📝 Summary

**This is the SIMPLEST way:**
- ✅ No Supabase Edge Functions
- ✅ No database triggers
- ✅ Just Node.js + Resend
- ✅ Works immediately

**Perfect for your use case!** 🎉

