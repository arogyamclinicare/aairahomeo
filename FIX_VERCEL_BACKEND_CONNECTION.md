# 🔧 Fix: Vercel Still Using localhost:5000

## ⚠️ Problem

Your Vercel site is still trying to connect to `http://localhost:5000` instead of your Render backend.

**Error:**
```
POST http://localhost:5000/newAppointment net::ERR_CONNECTION_REFUSED
```

---

## ✅ Solution: Set Environment Variable in Vercel

The frontend needs to know where your backend is! You need to tell Vercel your Render URL.

---

## 📋 Step-by-Step Fix

### Step 1: Get Your Render Backend URL

1. Go to **Render Dashboard**: https://dashboard.render.com
2. Click your web service
3. Copy the URL (should look like): `https://aaira-homeo-backend.onrender.com`

---

### Step 2: Add Environment Variable to Vercel

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click your project: **`aairahomeo`**
3. Click **"Settings"** tab (top menu)
4. Click **"Environment Variables"** (left sidebar)
5. Click **"+ Add"** button
6. Fill in:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-render-url.onrender.com` (paste your Render URL)
   - **Environment:** Select **Production**, **Preview**, and **Development** (or just Production)
7. Click **"Save"**

---

### Step 3: Redeploy Vercel (IMPORTANT!)

**After adding the environment variable, you MUST redeploy:**

1. Stay in Vercel dashboard
2. Click **"Deployments"** tab (top menu)
3. Find your latest deployment
4. Click **"⋯"** (three dots) on the right
5. Click **"Redeploy"**
6. Confirm by clicking **"Redeploy"** again
7. Wait 1-2 minutes for deployment to finish

**⚠️ IMPORTANT:** If you don't redeploy, Vercel won't use the new environment variable!

---

### Step 4: Verify It's Working

1. After redeployment finishes, visit your website
2. Open browser console (F12)
3. Try submitting the form
4. You should see requests going to your Render URL, NOT localhost!

**Check console - should see:**
```
POST https://your-render-url.onrender.com/newAppointment
```

**NOT:**
```
POST http://localhost:5000/newAppointment  ❌
```

---

## 🔍 Double-Check: Is Variable Set?

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. You should see: `VITE_API_URL` = `https://your-render-url.onrender.com`
3. If it's not there, add it (Step 2)
4. If it's there but wrong URL, edit it and redeploy

---

## 🆘 Still Not Working?

### "Variable is set but still using localhost"

1. Make sure you **redeployed** after adding the variable (Step 3)
2. Check variable value is correct (no typos)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard refresh page (Ctrl+F5)

### "Don't see the variable in Vercel"

1. Make sure you're in the **correct project**
2. Check **"Environment Variables"** section (not "Functions")
3. Variable name must be exactly: `VITE_API_URL` (case-sensitive!)

### "Render URL not working"

1. Check Render dashboard - is service **"Live"**?
2. Test Render URL directly: `https://your-url.onrender.com/api/health`
3. Should see JSON response - if not, Render deployment has issues

---

## 📝 Quick Checklist

- [ ] Render backend deployed and live
- [ ] Copied Render URL
- [ ] Added `VITE_API_URL` to Vercel environment variables
- [ ] Variable value is correct Render URL
- [ ] Redeployed Vercel after adding variable
- [ ] Waited for redeployment to finish
- [ ] Tested form submission
- [ ] Console shows requests to Render URL (not localhost)

---

**After setting the variable and redeploying, it will work!** 🚀

