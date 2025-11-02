# 📧 FREE Email Notifications - SIMPLE Setup (No CLI Required!)

**Follow these easy steps - no command line needed!** ✅

---

## 🎯 Option 1: Use Supabase Dashboard (EASIEST - No CLI!)

### Step 1: Get FREE Resend API Key (2 minutes)

1. **Go to**: [https://resend.com](https://resend.com)
2. **Sign up** (free, no credit card)
3. **Verify your email** (check inbox)
4. **Get API Key**:
   - Dashboard → **API Keys** → **Create API Key**
   - Name: `appointment-notifications`
   - **Copy the key** (starts with `re_...`)

### Step 2: Add Secrets in Supabase Dashboard (Easy Way!)

1. **Open**: [Supabase Dashboard](https://supabase.com/dashboard/project/gzdnefbqxmgjdoztozov)
2. Go to: **Edge Functions** → **Settings** → **Secrets**
3. **Add these secrets** (click "Add new secret" for each):

   **Secret 1:**
   - Name: `RESEND_API_KEY`
   - Value: `re_your_api_key_from_step_1`
   - Click **Save**

   **Secret 2:**
   - Name: `DOCTOR_EMAIL`
   - Value: `aairahomeobihar@gmail.com`
   - Click **Save**

   **Secret 3:**
   - Name: `FROM_EMAIL`
   - Value: `notifications@resend.dev`
   - Click **Save**

   **Secret 4:**
   - Name: `EMAIL_SERVICE`
   - Value: `resend`
   - Click **Save**

### Step 3: Deploy Edge Function (Using Dashboard)

1. **Install Supabase CLI** (one-time, 2 minutes):
   
   **For Windows:**
   ```powershell
   # Option 1: Using npm (easiest)
   npm install -g supabase
   
   # Option 2: Using Scoop (if you have it)
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   scoop install supabase
   ```

2. **Login** (opens browser):
   ```powershell
   supabase login
   ```
   - Browser will open automatically
   - Click "Authorize" in browser
   - Done!

3. **Link your project**:
   ```powershell
   cd c:\Users\suraj\OneDrive\Desktop\aairahomeo
   supabase link --project-ref gzdnefbqxmgjdoztozov
   ```

4. **Deploy the function**:
   ```powershell
   supabase functions deploy send-email-notification
   ```
   - Wait 1-2 minutes
   - You'll see "Deployed successfully" ✅

### Step 4: Create Database Webhook (Dashboard Method)

1. **Go to**: Supabase Dashboard → **Database** → **Webhooks**
2. **Click**: **New Webhook** button
3. **Fill in**:
   - **Name**: `email_notification`
   - **Table**: Select `appointments` from dropdown
   - **Events**: Check ✅ **INSERT**
   - **HTTP Request**:
     - **URL**: `https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-email-notification`
     - **Method**: `POST`
     - **HTTP Headers** (click "Add header" for each):
       - **Header 1**:
         - Key: `Authorization`
         - Value: `Bearer YOUR_SERVICE_ROLE_KEY`
       - **Header 2**:
         - Key: `Content-Type`
         - Value: `application/json`
     - **HTTP Request Body**:
       ```json
       {"record": $1}
       ```
4. **Click**: **Save**

### Step 5: Get Service Role Key (For Webhook)

1. **Go to**: Supabase Dashboard → **Settings** → **API**
2. **Find**: **service_role** key (under "Project API keys")
3. **Click**: 👁️ (eye icon) to reveal
4. **Copy** the key (starts with `eyJ...`)
5. **Paste** it in the webhook header (Step 4, Header 1 value)

### Step 6: Test It! 🎉

1. **Go to your website**
2. **Click**: "Book Appointment"
3. **Fill the form** with test data
4. **Submit**
5. **Check**: `aairahomeobihar@gmail.com` inbox
6. **You should receive email!** ✅

---

## 🚀 Alternative: Even Simpler Method (Using Make.com/Zapier)

**If CLI is too complicated, use Make.com (free tier available):**

### Step 1: Create Make.com Account (Free)

1. Go to [https://www.make.com](https://www.make.com)
2. Sign up (free tier = 1000 operations/month)
3. Create a new scenario

### Step 2: Set Up Automation

1. **Add Webhook Module**:
   - Add → **Webhooks** → **Custom webhook**
   - Copy the webhook URL

2. **Connect to Resend**:
   - Add → **Resend** → **Send an email**
   - Connect your Resend account
   - Set:
     - **To**: `aairahomeobihar@gmail.com`
     - **From**: `notifications@resend.dev`
     - **Subject**: `New Appointment - {{1.name}}`
     - **HTML**: Format the email with appointment data

3. **Save and Activate** scenario

### Step 3: Connect to Supabase

1. **Supabase Dashboard** → **Database** → **Webhooks** → **New Webhook**
2. **URL**: Paste your Make.com webhook URL
3. **Table**: `appointments`
4. **Events**: `INSERT`
5. **Save**

**Done!** Every appointment will trigger Make.com → Send email ✅

---

## ❓ Troubleshooting

### "Supabase CLI not found"?

**Windows - Install using npm (easiest):**
```powershell
npm install -g supabase
```

**Then verify:**
```powershell
supabase --version
```

### "Authentication failed"?

1. Run: `supabase login`
2. Browser opens automatically
3. Click "Authorize"
4. Return to terminal - you'll see "Logged in as..."

### "Function deploy failed"?

1. Make sure you're in the project folder:
   ```powershell
   cd c:\Users\suraj\OneDrive\Desktop\aairahomeo
   ```
2. Check if function file exists:
   ```powershell
   dir supabase\functions\send-email-notification
   ```
3. Try deploying again

### "No email received"?

1. Check **Spam folder**
2. Check Supabase logs: Dashboard → Edge Functions → Logs
3. Verify all secrets are set correctly
4. Test function manually (see below)

---

## 🧪 Test Function Manually

1. **Get your anon key**: Supabase Dashboard → Settings → API → anon public
2. **Run in PowerShell**:
   ```powershell
   $headers = @{
       "Authorization" = "Bearer YOUR_ANON_KEY_HERE"
       "Content-Type" = "application/json"
   }
   
   $body = @{
       record = @{
           name = "Test Patient"
           phone = "1234567890"
           email = "test@example.com"
           age = "30"
           problem = "Test appointment"
           preferred_date = "2025-01-20"
           preferred_time = "10:00 AM"
       }
   } | ConvertTo-Json
   
   Invoke-RestMethod -Uri "https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-email-notification" -Method POST -Headers $headers -Body $body
   ```

If it works, you'll see `"success": true` ✅

---

## 📞 Need Help?

**Which step are you stuck on?**
- ✅ Step 1: Getting Resend API key
- ✅ Step 2: Adding secrets in Supabase Dashboard
- ✅ Step 3: Installing/using Supabase CLI
- ✅ Step 4: Creating webhook
- ✅ Step 5: Testing

**Just tell me which step and I'll help!** 😊

---

## ✨ Summary - What You Need:

1. ✅ **Resend account** (free - [resend.com](https://resend.com))
2. ✅ **Supabase Dashboard** access
3. ✅ **Supabase CLI** (one-time install)
4. ✅ **5 minutes** of your time!

**That's it!** No coding, no complex setup. Just follow the steps above! 🚀

