# 🚀 Deploy Backend to Render (FREE)

**Yes! Render can host your backend, but free tier spins down after 15 min inactivity.**

---

## ⚠️ Render Free Tier Limitations

- ✅ **FREE** web service
- ⚠️ **Spins down** after 15 minutes of no activity
- ⏱️ **Cold start delay**: ~30 seconds when waking up
- ✅ **Auto-wakes** when receiving requests

**Solution:** Use a keep-alive ping to prevent sleep (I'll show you below)

---

## 🚀 Step-by-Step: Deploy to Render

### Step 1: Sign Up for Render

1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (recommended) or email
4. Verify your email

---

### Step 2: Create New Web Service

1. Click **"+ New"** → **"Web Service"**
2. Connect your GitHub repository: **`aairahomeo`**
3. Render will detect your repo

---

### Step 3: Configure Settings

**Settings to fill:**

- **Name:** `aaira-homeo-backend` (or any name)
- **Region:** Choose closest to you (e.g., `Oregon (US West)`)
- **Branch:** `main`
- **Root Directory:** `backend` ⚠️ **IMPORTANT!**
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** **Free** (select free tier)

---

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these 5 variables:

```
SUPABASE_URL = https://gzdnefbqxmgjdoztozov.supabase.co
```

```
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key_here
```
(Get from: Supabase Dashboard → Settings → API → service_role key)

```
RESEND_API_KEY = re_your_resend_api_key_here
```
(Get from: resend.com → API Keys)

```
ADMIN_EMAIL = aairahomeobihar@gmail.com
```

```
PORT = 5000
```

---

### Step 5: Deploy!

1. Click **"Create Web Service"**
2. Render will start building (takes 2-3 minutes)
3. Wait for **"Live"** status (green)
4. **Copy your Render URL:** `https://your-app.onrender.com`

---

### Step 6: Keep-Alive Setup (Prevent Sleep)

Render free tier sleeps after 15 min. To keep it awake:

**Option A: GitHub Actions (FREE & Automatic)** ⭐ Recommended

1. Create file: `.github/workflows/render-keepalive.yml`
2. I'll create this for you (see below)

**Option B: External Ping Service**
- Use: https://cron-job.org (free)
- Ping your URL every 14 minutes

---

### Step 7: Update Vercel

1. Go to **Vercel Dashboard** → Your project
2. **Settings** → **Environment Variables**
3. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-app.onrender.com` (your Render URL)
4. **Deployments** → **Redeploy**

---

## ✅ Done!

Your backend is now live on Render! 🎉

---

## 🆘 Troubleshooting

### "Build failed"?

- Check **Logs** tab in Render
- Verify `backend` folder has `package.json`
- Check `Root Directory` is set to `backend`

### "Environment variable error"?

- Make sure all 5 variables are added
- Check spelling (case-sensitive!)

### "Service sleeping"?

- First request after 15 min will take ~30 seconds (wake up)
- Set up keep-alive ping (see Step 6)

---

## 📝 Next: Set Up Keep-Alive

I'll create the GitHub Actions file to keep your Render service awake automatically.

**See:** `RENDER_KEEPALIVE_SETUP.md` (coming next)

