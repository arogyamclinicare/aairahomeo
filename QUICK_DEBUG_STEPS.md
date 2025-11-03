# 🚨 Quick Debug Steps (Do These First!)

**Answer these questions:**

---

## 1️⃣ Is Data Saving to Database?

1. Submit test appointment on your website
2. Go to **Supabase Dashboard** → **Database** → **Table Editor** → `appointments`
3. **Do you see the new appointment?**
   - ✅ YES → Good! Form works. Go to #2
   - ❌ NO → Form not submitting. Check Supabase connection in `.env`

---

## 2️⃣ Is Edge Function Being Called?

1. Go to **Supabase Dashboard** → **Edge Functions** → `send-email-notification`
2. Click **Logs** tab
3. **Submit another test appointment**
4. **Refresh logs**
5. **Do you see ANY log entries?** (even errors count!)
   - ✅ YES → Function is being called! Go to #3
   - ❌ NO → Trigger not firing. Go to #4

---

## 3️⃣ Check Edge Function Logs for Errors

Look at the logs from #2. What do you see?

**If you see errors:**
- **"RESEND_API_KEY not configured"** → Add secret in Step 2 of setup guide
- **"Unauthorized"** → Check Resend API key
- **"Failed to send email"** → Check Resend dashboard for details

**If you see "Success":**
- But no email received → Check spam folder
- Check Resend dashboard: [resend.com/emails](https://resend.com/emails)

---

## 4️⃣ Trigger Not Firing - Quick Fix

If trigger isn't firing, try this simpler trigger:

1. Go to **SQL Editor**
2. Run this SQL:

```sql
-- First, enable http extension
CREATE EXTENSION IF NOT EXISTS http;

-- Drop old trigger if exists
DROP TRIGGER IF EXISTS trigger_notify_email_on_appointment ON appointments;
DROP FUNCTION IF EXISTS notify_email_on_appointment();

-- Create new simpler function
CREATE OR REPLACE FUNCTION notify_email_on_appointment()
RETURNS TRIGGER AS $$
DECLARE
  webhook_url TEXT := 'https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-email-notification';
  payload JSONB;
  response http_response;
  service_role_key TEXT := 'YOUR_SERVICE_ROLE_KEY_HERE'; -- REPLACE THIS!
BEGIN
  payload := jsonb_build_object('record', row_to_json(NEW));
  
  -- Get service role key from Supabase settings
  -- For now, we'll hardcode it (you'll replace it)
  SELECT * INTO response FROM http_post(
    webhook_url,
    payload::text,
    'application/json'::text,
    ARRAY[
      http_header('Authorization', 'Bearer ' || service_role_key),
      http_header('Content-Type', 'application/json')
    ]
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Email trigger error: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER trigger_notify_email_on_appointment
  AFTER INSERT ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION notify_email_on_appointment();
```

**⚠️ IMPORTANT:** Before running, get your Service Role Key:
- Dashboard → **Settings** → **API** → Copy **service_role** key
- Replace `YOUR_SERVICE_ROLE_KEY_HERE` in the SQL above

---

## 5️⃣ Check All Secrets Are Set

1. **Edge Functions** → **Secrets**
2. Verify these 4 secrets exist:

| Secret Name | Example Value |
|------------|---------------|
| `RESEND_API_KEY` | `re_abc123...` |
| `EMAIL_SERVICE` | `resend` |
| `DOCTOR_EMAIL` | `aairahomeobihar@gmail.com` |
| `FROM_EMAIL` | `notifications@resend.dev` |

**If any missing → Add it!**

---

## 📞 Tell Me Which Step Failed

Once you do steps 1-5, tell me:
- ✅ Which steps passed?
- ❌ Which step failed?
- 🔍 What error messages you see?

Then I'll help you fix it! 🔧

