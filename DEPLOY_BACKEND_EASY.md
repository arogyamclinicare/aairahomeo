# 🚀 Deploy Backend to Railway (Easiest Way)

**Time: 10 minutes | Cost: FREE**

---

## ✅ Why Railway?

- **FREE** for small apps (500 hours/month free)
- **Super easy** - just connect GitHub
- **Auto-deploys** when you push code
- **No credit card** required
- **Works instantly** - no complex setup

---

## 📋 Step-by-Step Guide

### Step 1: Sign Up for Railway

1. Go to: **https://railway.app**
2. Click **"Start a New Project"**
3. Sign up with **GitHub** (recommended) or email
4. Confirm your email if needed

---

### Step 2: Create New Project

1. Click **"+ New Project"** (top right)
2. Select **"Deploy from GitHub repo"**
3. If asked, authorize Railway to access your GitHub
4. Find your repository: **`aairahomeo`**
5. Click **"Deploy Now"**

---

### Step 3: Configure Backend Folder

1. Railway will ask for settings. Click **"Settings"** tab
2. Find **"Root Directory"** setting
3. Change it to: **`backend`**
   - This tells Railway to deploy the `backend` folder, not the whole project
4. Save

---

### Step 4: Add Environment Variables

1. Click **"Variables"** tab (in Railway dashboard)
2. Add these **5 variables** one by one:

   ```
   SUPABASE_URL=https://gzdnefbqxmgjdoztozov.supabase.co
   ```
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
   ```
   RESEND_API_KEY=re_your_resend_api_key_here
   ```
   ```
   ADMIN_EMAIL=aairahomeobihar@gmail.com
   ```
   ```
   PORT=5000
   ```

3. **Important**: Copy exactly from your `backend/.env` file
4. Click **"Add"** after each variable

---

### Step 5: Deploy!

1. Railway will **auto-deploy** when you add variables
2. Wait 1-2 minutes for deployment to finish
3. You'll see a green **"Deployed"** status

---

### Step 6: Get Your Backend URL

1. Click **"Settings"** tab
2. Find **"Generate Domain"** button
3. Click it - Railway will create a URL like:
   ```
   https://your-app-name.up.railway.app
   ```
4. **Copy this URL** - you'll need it next!

---

### Step 7: Update Frontend (Vercel)

1. Go to your **Vercel dashboard**: https://vercel.com/dashboard
2. Find your project: **`aairahomeo`**
3. Click **"Settings"** → **"Environment Variables"**
4. Add this variable:

   **Variable Name:**
   ```
   VITE_API_URL
   ```

   **Value:**
   ```
   https://your-app-name.up.railway.app
   ```
   (Use the Railway URL from Step 6!)

5. Click **"Save"**
6. Go to **"Deployments"** tab
7. Click **"⋯"** (three dots) on latest deployment
8. Click **"Redeploy"**

---

### Step 8: Test It! ✅

1. Go to your website: `https://your-vercel-url.vercel.app`
2. Fill out the appointment form
3. Submit it
4. Check your email: `aairahomeobihar@gmail.com`
5. You should receive the notification! 🎉

---

## 🔍 Verify Backend is Running

Visit your Railway backend URL:
```
https://your-app-name.up.railway.app/api/health
```

You should see:
```json
{
  "status": "ok",
  "message": "Appointment API is running"
}
```

If you see this, backend is working! ✅

---

## 🆘 Troubleshooting

### "Deployment failed"?

1. Check **Railway logs** (click "Logs" tab)
2. Look for error messages
3. Common issues:
   - Missing environment variables → Add them in "Variables" tab
   - Wrong root directory → Set to `backend` in Settings

### "Backend URL not working"?

1. Check Railway dashboard → Settings → Domain
2. Make sure the URL is copied correctly to Vercel
3. Wait 2-3 minutes after deployment

### "Form still not working"?

1. Check browser console (F12) for errors
2. Verify `VITE_API_URL` is set in Vercel
3. Make sure you redeployed after adding the variable

---

## 📝 Quick Checklist

- [ ] Railway account created
- [ ] Project deployed from GitHub
- [ ] Root directory set to `backend`
- [ ] All 5 environment variables added
- [ ] Backend URL generated
- [ ] `VITE_API_URL` added to Vercel
- [ ] Vercel project redeployed
- [ ] Health check URL works (`/api/health`)
- [ ] Form submission test successful
- [ ] Email notification received

---

## 🎉 Done!

Your backend is now live and your website will send emails automatically!

**No more localhost** - everything works in production! 🚀

---

## 🔄 Future Updates

Whenever you update the backend code:

1. Push to GitHub
2. Railway **auto-deploys** (takes 1-2 minutes)
3. That's it! No manual steps needed.

---

**Need help?** Check Railway logs or ask me! 😊


