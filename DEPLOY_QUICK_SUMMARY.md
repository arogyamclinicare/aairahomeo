# ⚡ Quick Deployment Summary

## ✅ What You Need to Do

### 1. Deploy Backend to Railway (10 mins)

1. Go to: **https://railway.app**
2. Sign up → "New Project" → Connect GitHub → Select `aairahomeo`
3. Settings → Root Directory: `backend`
4. Variables → Add 5 variables (from `backend/.env`):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `PORT=5000`
5. Settings → Generate Domain → **Copy the URL**

---

### 2. Update Vercel Frontend (2 mins)

1. Go to: **https://vercel.com/dashboard**
2. Your project → Settings → Environment Variables
3. Add: `VITE_API_URL` = `https://your-railway-url.up.railway.app`
4. Deployments → Redeploy latest

---

### 3. Test ✅

1. Visit your website
2. Submit appointment form
3. Check email: `aairahomeobihar@gmail.com`

**Done!** 🎉

---

**Full guide**: See `DEPLOY_BACKEND_EASY.md` for detailed steps.


