# 🎯 EASIEST Email Notification Setup - Resend.com

**The SIMPLEST way to get email notifications - No backend server needed!**

**FREE:** 3000 emails/month (more than enough!)

---

## ✅ What You Get

When someone submits the appointment form → **You get email instantly!** 📧

**Email includes:**
- Patient name, phone, email
- Problem description
- Preferred date & time
- WhatsApp link to contact them
- Beautiful HTML email design

---

## 🚀 Setup (5 Minutes!)

### Step 1: Get Resend API Key (2 minutes)

1. Go to [https://resend.com](https://resend.com)
2. **Sign up** (FREE account - no credit card needed!)
3. Go to **API Keys** → Click **Create API Key**
4. **Name it**: `Supabase Notifications`
5. **Copy the API key** (starts with `re_...`)
   - ⚠️ **Save it!** You can only see it once!

---

### Step 2: Add API Key to Supabase (2 minutes)

**Option A: Using Supabase Dashboard (EASIEST - No CLI!)**

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: `gzdnefbqxmgjdoztozov`
3. Go to **Edge Functions** → **Secrets** (or Settings → API → Secrets)
4. Click **Add Secret**
5. Add these secrets:

   **Secret 1:**
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_...` (paste your Resend API key)

   **Secret 2:**
   - **Name:** `EMAIL_SERVICE`
   - **Value:** `resend`

   **Secret 3:**
   - **Name:** `DOCTOR_EMAIL`
   - **Value:** `aairahomeobihar@gmail.com`

   **Secret 4:**
   - **Name:** `FROM_EMAIL`
   - **Value:** `notifications@resend.dev` (or your verified email domain)

6. Click **Save** for each secret

---

**Option B: Using Supabase CLI (If you prefer command line)**

```bash
supabase secrets set --project-ref gzdnefbqxmgjdoztozov \
  RESEND_API_KEY=re_your_api_key_here \
  EMAIL_SERVICE=resend \
  DOCTOR_EMAIL=aairahomeobihar@gmail.com \
  FROM_EMAIL=notifications@resend.dev
```

---

### Step 3: Deploy Edge Function (1 minute - Choose One Option)

**✅ The Edge Function code is ready in your project!** Now you need to deploy it.

**Choose EITHER Option A (Dashboard - No CLI) OR Option B (CLI):**

---

#### **Option A: Deploy via Supabase Dashboard (EASIEST - No CLI needed!)** ⭐

1. Go to Supabase Dashboard → **Edge Functions**
2. Click **Create a new function**
3. **Function name:** `send-email-notification`
4. **Copy the code** from: `supabase/functions/send-email-notification/index.ts`
5. **Paste it** in the editor
6. Click **Deploy**
7. ✅ Done!

---

#### **Option B: Deploy via Supabase CLI (If you prefer CLI)**

**First, install Supabase CLI:**

#### **Windows Installation:**

**Option 1: Using npm (Easiest - if you have Node.js installed)**
```powershell
# Open PowerShell
npm install -g supabase

# Verify installation
supabase --version
```

**Option 2: Using Scoop (If you have Scoop package manager)**
```powershell
# Add Supabase bucket
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git

# Install Supabase CLI
scoop install supabase
```

**Option 3: Direct Download**
1. Go to [Supabase CLI Releases](https://github.com/supabase/cli/releases)
2. Download `supabase_windows_amd64.zip` for Windows
3. Extract and add to your PATH

---

#### **After Installing CLI (if needed):**

```bash
# Login to Supabase
supabase login
# (Opens browser for authentication)

# Link your project
supabase link --project-ref gzdnefbqxmgjdoztozov

# Deploy the email function
supabase functions deploy send-email-notification
```

---

**⚠️ Note:** **Option A (Dashboard) is easier!** No CLI installation needed. Only use CLI if you prefer command line tools.

---

### Step 4: Create Database Trigger (1 minute)

**Option A: Using Supabase Dashboard SQL Editor**

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Enable http extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS http;

-- Create trigger for email notifications
CREATE OR REPLACE FUNCTION notify_email_on_appointment()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-email-notification';
  payload JSONB;
  response http_response;
BEGIN
  payload := jsonb_build_object('record', row_to_json(NEW));
  
  SELECT * INTO response FROM http_post(
    webhook_url,
    payload::text,
    'application/json'::text,
    ARRAY[
      http_header(
        'Authorization',
        'Bearer ' || current_setting('app.settings.service_role_key', true)
      )
    ]
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Failed to send email: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS trigger_notify_email_on_appointment ON appointments;
CREATE TRIGGER trigger_notify_email_on_appointment
  AFTER INSERT ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION notify_email_on_appointment();
```

4. Click **Run** (or press Ctrl+Enter)
5. ✅ Done!

---

**Option B: Run Migration File**

The migration file is already created at: `supabase/migrations/003_create_email_notification_trigger.sql`

Run it in Supabase SQL Editor or via CLI:

```bash
supabase db push
```

---

## ✅ Test It!

1. Submit a test appointment on your website
2. Check your email: `aairahomeobihar@gmail.com`
3. You should receive a beautiful email! 🎉

---

## 🔧 Troubleshooting

### "Email not received?"

1. **Check Supabase Edge Functions Logs:**
   - Dashboard → Edge Functions → `send-email-notification` → Logs
   - Look for errors

2. **Check Resend Dashboard:**
   - [resend.com/emails](https://resend.com/emails)
   - See if email was sent

3. **Check Spam Folder:**
   - Sometimes first emails go to spam

4. **Verify Secrets:**
   - Dashboard → Edge Functions → Secrets
   - Make sure all 4 secrets are set correctly

### "RESEND_API_KEY not configured"

- Make sure you added the secret in Supabase Dashboard
- Check the secret name is exactly: `RESEND_API_KEY`

---

## 💰 Cost

**FREE!** 
- Resend: 3000 emails/month free
- Supabase Edge Functions: Free tier (500K invocations/month)

**More than enough for your clinic!**

---

## 🎉 That's It!

**Now you get email notifications automatically!** 

No backend server, no Make.com, no complex setup - just Supabase + Resend!

---

## 📱 Want WhatsApp Too?

We already have WhatsApp notifications set up! Check `WHATSAPP_NOTIFICATIONS_SETUP.md`

You can have BOTH email AND WhatsApp notifications! 🔔📧

