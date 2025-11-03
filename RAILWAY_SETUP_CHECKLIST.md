# ✅ Railway Deployment Checklist

**Follow this step-by-step. It takes about 10 minutes!**

---

## 📋 Before You Start - Get Your Keys Ready

You'll need these from your `backend/.env` file:

1. ✅ `SUPABASE_SERVICE_ROLE_KEY` 
2. ✅ `RESEND_API_KEY`
3. ✅ `ADMIN_EMAIL` (already know: `aairahomeobihar@gmail.com`)

**Open `backend/.env` file and have these ready to copy!**

---

## 🚀 Step 1: Sign Up for Railway

1. Go to: **https://railway.app**
2. Click **"Start a New Project"** or **"Login"**
3. Sign up with **GitHub** (best option - connects automatically)
   - Or sign up with email
4. Complete signup (verify email if needed)

**✅ Done when:** You see the Railway dashboard

---

## 🚀 Step 2: Deploy from GitHub

1. Click **"+ New Project"** (big button)
2. Select **"Deploy from GitHub repo"**
3. **If first time:** Authorize Railway to access GitHub
4. Find repository: **`aairahomeo`** (type to search)
5. Click **"Deploy Now"**

**✅ Done when:** Railway starts "Building" your project

---

## ⚙️ Step 3: Set Root Directory to `backend`

⚠️ **CRITICAL STEP!** Railway will try to deploy the whole project, but we only want the `backend` folder.

1. Click on your project (once it appears)
2. Click **"Settings"** tab (top menu)
3. Scroll down to **"Root Directory"**
4. Click the field and type: **`backend`**
5. Click **"Save"** or press Enter
6. Railway will **automatically redeploy**

**✅ Done when:** You see "Building" again after saving

---

## 🔐 Step 4: Add Environment Variables

**This is where you add your API keys!**

1. Still in **Settings**, find **"Variables"** section
2. Click **"+ New Variable"** button
3. Add these **5 variables** one by one:

### Variable 1:
- **Key:** `SUPABASE_URL`
- **Value:** `https://gzdnefbqxmgjdoztozov.supabase.co`
- Click **"Add"**

### Variable 2:
- **Key:** `SUPABASE_SERVICE_ROLE_KEY`
- **Value:** *(Copy from your `backend/.env` file)*
- Click **"Add"**

### Variable 3:
- **Key:** `RESEND_API_KEY`
- **Value:** *(Copy from your `backend/.env` file)*
- Click **"Add"**

### Variable 4:
- **Key:** `ADMIN_EMAIL`
- **Value:** `aairahomeobihar@gmail.com`
- Click **"Add"**

### Variable 5:
- **Key:** `PORT`
- **Value:** `5000`
- Click **"Add"**

**✅ Done when:** All 5 variables are listed in the Variables section

---

## 🚀 Step 5: Wait for Deployment

1. Watch the **"Deployments"** tab (top menu)
2. Wait for status to turn **"Active"** or **"Deployed"** (green)
3. This takes 1-2 minutes

**✅ Done when:** Status shows green "Active" or "Deployed"

---

## 🌐 Step 6: Generate Domain URL

1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Find **"Generate Domain"** button
4. Click it
5. Railway creates a URL like: `https://aaira-homeo-backend-production-xxxx.up.railway.app`
6. **📋 COPY THIS URL** - You'll need it!

**✅ Done when:** You have a Railway URL copied

---

## ✅ Step 7: Test Your Backend

1. Open the Railway URL in browser (or add `/api/health` at the end)
2. Should see:
   ```json
   {
     "status": "ok",
     "message": "Appointment API is running"
   }
   ```

**✅ Done when:** You see the JSON response

---

## 🔗 Step 8: Connect to Vercel

Now connect your frontend (Vercel) to this backend:

1. Go to **Vercel Dashboard:** https://vercel.com/dashboard
2. Find project: **`aairahomeo`**
3. Click **"Settings"** → **"Environment Variables"**
4. Click **"+ Add"**
5. **Key:** `VITE_API_URL`
6. **Value:** *(Paste your Railway URL from Step 6)*
7. Click **"Save"**
8. Go to **"Deployments"** tab
9. Click **"⋯"** (three dots) on latest deployment
10. Click **"Redeploy"**

**✅ Done when:** Vercel finishes redeploying

---

## 🎉 Step 9: Test Everything!

1. Visit your website (Vercel URL)
2. Fill out the appointment form
3. Submit it
4. Check email: `aairahomeobihar@gmail.com`
5. **You should receive the notification!** 🎉

---

## 🆘 Troubleshooting

### "Build failed" or "Deployment failed"?

1. Click **"Logs"** tab in Railway
2. Look for red error messages
3. Common issues:
   - **"Root Directory not found"** → Set Root Directory to `backend` (Step 3)
   - **"Missing environment variable"** → Add all 5 variables (Step 4)
   - **"npm install failed"** → Check package.json exists in `backend` folder

### "Backend URL returns 404"?

1. Make sure deployment finished (green status)
2. Wait 1-2 more minutes
3. Try the `/api/health` endpoint

### "Form still not working on website"?

1. Check browser console (F12) for errors
2. Verify `VITE_API_URL` is set in Vercel
3. Make sure you **redeployed** Vercel after adding the variable
4. Check Railway logs to see if requests are coming in

---

## 📞 Need Help?

If stuck at any step, tell me:
- What step you're on
- What error you see (screenshot or copy-paste)
- I'll help you fix it! 😊

---

**You got this! It's easier than it looks!** 🚀

