# 🔍 Debug: Email Notifications Not Working

**Step-by-step troubleshooting guide**

---

## ✅ Step 1: Check if Form is Submitting to Supabase

1. **Submit a test appointment** on your website
2. **Check Supabase Dashboard:**
   - Go to **Database** → **Table Editor**
   - Open `appointments` table
   - **Do you see a new row?** 
     - ✅ **YES** → Form is working, move to Step 2
     - ❌ **NO** → Form isn't submitting. Check your Supabase connection

---

## ✅ Step 2: Check if Trigger is Firing

1. Go to **Supabase Dashboard** → **Database** → **Database Functions**
2. Look for `notify_email_on_appointment` function
3. **Check Edge Function Logs:**
   - Go to **Edge Functions** → `send-email-notification` → **Logs**
   - **Do you see any log entries?**
     - ✅ **YES** (even errors) → Trigger is working, move to Step 3
     - ❌ **NO** → Trigger isn't firing, see "Fix Trigger" below

---

## ✅ Step 3: Check Edge Function Secrets

1. Go to **Supabase Dashboard** → **Edge Functions** → **Secrets**
2. **Verify all 4 secrets exist:**

   ✅ `RESEND_API_KEY` = `re_...` (your Resend key)
   
   ✅ `EMAIL_SERVICE` = `resend`
   
   ✅ `DOCTOR_EMAIL` = `aairahomeobihar@gmail.com`
   
   ✅ `FROM_EMAIL` = `notifications@resend.dev`

3. **If any secret is missing:**
   - Click **Add Secret**
   - Add the missing secret
   - Save

---

## ✅ Step 4: Check Edge Function Logs for Errors

1. **Submit another test appointment**
2. **Immediately check:**
   - **Supabase Dashboard** → **Edge Functions** → `send-email-notification` → **Logs**
   - Look for **red error messages**

### Common Errors:

**Error: "RESEND_API_KEY not configured"**
- → Add `RESEND_API_KEY` secret (Step 3)

**Error: "Unauthorized" or "401"**
- → Check your Resend API key is correct
- → Make sure it starts with `re_`

**Error: "Failed to send email"**
- → Check Resend dashboard: [resend.com/emails](https://resend.com/emails)
- → See detailed error message there

---

## ✅ Step 5: Verify Resend API Key

1. Go to [resend.com](https://resend.com)
2. **Dashboard** → **API Keys**
3. **Is your API key active?**
4. **Copy it again** and verify it matches what's in Supabase secrets

---

## ✅ Step 6: Test Edge Function Manually

Let's test if the function works when called directly:

1. **Get your Supabase Service Role Key:**
   - Dashboard → **Settings** → **API** → Copy **service_role** key

2. **Test the function:**
   - Go to **Edge Functions** → `send-email-notification` → **Invoke**
   - Or use this curl command (replace YOUR_SERVICE_ROLE_KEY):

```bash
curl -X POST https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-email-notification \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "record": {
      "name": "Test Patient",
      "phone": "7488467727",
      "age": "25",
      "problem": "Testing email function",
      "email": "test@example.com"
    }
  }'
```

3. **Check logs** - Do you see an error or success?

---

## 🔧 Fix: Trigger Not Firing

If trigger isn't firing, the SQL might have an issue:

1. **Check if trigger exists:**
   - Go to **Database** → **Database Functions**
   - Look for `notify_email_on_appointment`
   - If NOT there → Re-run the SQL from Step 4

2. **Re-create trigger:**
   - Go to **SQL Editor**
   - Run this to check if trigger exists:

```sql
SELECT * FROM pg_trigger WHERE tgname = 'trigger_notify_email_on_appointment';
```

   - If returns nothing → Trigger doesn't exist, re-run the CREATE TRIGGER SQL

3. **Test trigger manually:**
   - Go to **SQL Editor**
   - Run:

```sql
INSERT INTO appointments (name, phone, age, problem, status)
VALUES ('Test', '1234567890', '25', 'Test problem', 'pending');
```

   - Then check Edge Function logs - should see a call

---

## 🆘 Still Not Working?

**Check these:**

1. **Is Edge Function deployed?**
   - Dashboard → Edge Functions → `send-email-notification`
   - Should show "Active" status

2. **Check browser console:**
   - When submitting form, open browser console (F12)
   - Any errors?

3. **Check Supabase connection:**
   - Is your website connecting to Supabase?
   - Check `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

---

## 📝 Quick Checklist

- [ ] Form submits to Supabase (check `appointments` table)
- [ ] Trigger exists (check Database Functions)
- [ ] Edge Function deployed (check Edge Functions list)
- [ ] All 4 secrets are set (check Secrets)
- [ ] Edge Function logs show activity (even errors)
- [ ] Resend API key is valid (check Resend dashboard)
- [ ] Resend dashboard shows no emails sent (confirm no activity)

---

## 💡 Most Common Issues

1. **Secrets not set** → Add all 4 secrets in Supabase
2. **Wrong API key** → Verify Resend API key is correct
3. **Trigger not created** → Re-run SQL from Step 4
4. **Function not deployed** → Deploy via Dashboard
5. **http extension missing** → Run `CREATE EXTENSION IF NOT EXISTS http;` in SQL Editor

---

Let me know which step fails and we'll fix it! 🔧

