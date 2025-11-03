# 🔄 Keep Render Backend Awake (Free)

**Problem:** Render free tier sleeps after 15 minutes of inactivity.

**Solution:** GitHub Actions will ping your backend every 10 minutes (FREE!)

---

## ✅ Step 1: Create GitHub Actions File

Create this file in your repo:

**File path:** `.github/workflows/render-keepalive.yml`

**Content:**

```yaml
name: Keep Render Backend Awake

on:
  schedule:
    # Ping every 10 minutes
    - cron: '*/10 * * * *'
  workflow_dispatch: # Allows manual trigger

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Render Backend
        run: |
          curl -f https://your-app.onrender.com/api/health || echo "Ping failed"
```

**⚠️ IMPORTANT:** Replace `your-app.onrender.com` with your actual Render URL!

---

## ✅ Step 2: Get Your Render URL

1. Go to Render dashboard
2. Click your web service
3. Copy the URL (e.g., `https://aaira-homeo-backend.onrender.com`)

---

## ✅ Step 3: Update the File

1. Replace `your-app.onrender.com` with your Render URL
2. Save the file
3. Commit and push to GitHub:

```powershell
git add .github/workflows/render-keepalive.yml
git commit -m "Add GitHub Actions keep-alive for Render backend"
git push
```

---

## ✅ Step 4: Enable GitHub Actions

1. Go to your GitHub repo: `https://github.com/arogyamclinicare/aairahomeo`
2. Click **"Actions"** tab
3. If prompted, click **"Enable GitHub Actions"**
4. Wait 1-2 minutes
5. You'll see the workflow run automatically!

---

## ✅ How It Works

- **Every 10 minutes**, GitHub Actions pings your Render backend
- Keeps it awake (no 15-minute sleep)
- **Completely FREE** (GitHub Actions free tier is generous)
- **Automatic** - set it and forget it!

---

## 🔍 Verify It's Working

1. Go to **GitHub repo** → **Actions** tab
2. You should see **"Keep Render Backend Awake"** workflow
3. Click it → see green checkmarks ✅
4. Check **Render logs** - you'll see health check requests every 10 minutes

---

## 🆘 Troubleshooting

### "Workflow not running"?

- Check **Actions** tab is enabled in GitHub repo settings
- Verify the YAML syntax is correct (no typos)
- Wait 10 minutes for first run

### "Ping failed"?

- Check your Render URL is correct
- Verify backend is deployed and live
- Check Render logs for errors

---

**Done! Your Render backend will stay awake 24/7!** 🎉

