# 🔍 Email Not Received - Troubleshooting Guide

**Backend says "✅ Email sent successfully" but no email received?**

Here's how to debug:

---

## ✅ Step 1: Check Resend Dashboard

**Most Important - Check if Resend actually sent it:**

1. Go to [https://resend.com/emails](https://resend.com/emails)
2. **Login** to your Resend account
3. **Check the "Emails" tab**
4. **Look for recent emails**

**What to look for:**
- ✅ **"Delivered"** → Email was sent, check spam folder
- ✅ **"Sent"** → Email was sent, check spam folder  
- ❌ **"Failed"** → Click to see error message
- ❌ **"Pending"** → Still processing
- ❌ **No emails** → Resend API key might be wrong

---

## ✅ Step 2: Verify Resend API Key

1. Go to [resend.com](https://resend.com)
2. **Dashboard** → **API Keys**
3. **Check your API key:**
   - Is it active?
   - Does it match what's in `backend/.env`?
   - Copy it again and verify

**Update in `backend/.env`:**
```env
RESEND_API_KEY=re_your_actual_key_here
```

**Restart backend** after updating!

---

## ✅ Step 3: Check Spam Folder

**Most common issue!**

1. Check **Spam/Junk** folder
2. Check **Promotions** tab (Gmail)
3. Search for: `aairahomeobihar@gmail.com` or `resend.dev`

---

## ✅ Step 4: Verify Email Domain in Resend

**Using `onboarding@resend.dev` - This might have limits!**

1. Go to [resend.com/domains](https://resend.com/domains)
2. **Check if you need to verify your domain**
3. For free tier, `onboarding@resend.dev` should work, but:
   - Only 100 emails/day limit
   - Might go to spam more often

**Better option - Verify your domain:**
1. Go to Resend → **Domains** → **Add Domain**
2. Add your domain (if you have one)
3. Update `from` email in `backend/controller.js`

---

## ✅ Step 5: Check Resend Account Status

1. Go to [resend.com](https://resend.com)
2. **Check your account status:**
   - Is it verified?
   - Any warnings/errors?
   - Account limits reached?

---

## ✅ Step 6: Test Resend API Directly

**Test if Resend API key works:**

1. **Go to Resend Dashboard** → **API** → **Test**
2. **Or use this PowerShell command** (replace YOUR_API_KEY):

```powershell
$headers = @{
    "Authorization" = "Bearer YOUR_API_KEY"
    "Content-Type" = "application/json"
}

$body = @{
    from = "onboarding@resend.dev"
    to = "aairahomeobihar@gmail.com"
    subject = "Test Email"
    html = "<h1>Test</h1>"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api.resend.com/emails" -Method Post -Headers $headers -Body $body
```

**If this fails** → API key is wrong or account issue

---

## ✅ Step 7: Check Backend Logs for Details

**Look at backend console more carefully:**

After submitting, check for:
- ✅ `✅ Email sent successfully` → Good
- ❌ Any warnings before this?
- ❌ Any Resend API errors?

**Enable more detailed logging:**

Add this to `backend/controller.js` after line 85:

```javascript
console.log("Email response:", JSON.stringify(emailResponse, null, 2));
```

This will show Resend's response with more details.

---

## 🎯 Most Common Issues & Fixes

### Issue 1: Email in Spam
**Fix:** Check spam folder, mark as "Not Spam"

### Issue 2: Resend API Key Wrong
**Fix:** 
1. Get new API key from Resend
2. Update `backend/.env`
3. Restart backend

### Issue 3: Domain Not Verified
**Fix:**
1. Use `onboarding@resend.dev` (temporary)
2. Or verify your domain in Resend
3. Update `from` email in controller

### Issue 4: Account Limits Reached
**Fix:**
- Check Resend dashboard for limits
- Free tier: 3000 emails/month
- Upgrade if needed

### Issue 5: Email Address Typo
**Fix:**
- Check `ADMIN_EMAIL` in `backend/.env`
- Should be: `aairahomeobihar@gmail.com`

---

## 🔧 Quick Fixes to Try

### Fix 1: Update From Email

**In `backend/controller.js` line 84:**

Change from:
```javascript
from: "Aaira Homeo Clinic <onboarding@resend.dev>"
```

To:
```javascript
from: "onboarding@resend.dev"  // Simpler, sometimes works better
```

### Fix 2: Verify Email in Resend

1. Go to Resend Dashboard
2. **Settings** → **Email Addresses**
3. Add and verify `aairahomeobihar@gmail.com` as recipient

### Fix 3: Check Resend Logs

1. Go to Resend Dashboard
2. **Emails** → **Logs**
3. See detailed delivery status

---

## 📝 What to Check Next

1. ✅ **Resend Dashboard** - Did email show as "sent" or "failed"?
2. ✅ **Spam Folder** - Check thoroughly
3. ✅ **API Key** - Verify it's correct
4. ✅ **Backend .env** - Check all values
5. ✅ **Resend Account** - Any warnings/limits?

---

## 💡 Tell Me:

1. **What does Resend Dashboard show?** (Sent/Failed/Pending?)
2. **Did you check spam folder?**
3. **Is your Resend API key active in dashboard?**
4. **Any errors in Resend dashboard?**

**Share these details and I'll help fix it!** 🔧

