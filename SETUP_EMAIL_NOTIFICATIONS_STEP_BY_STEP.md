# 📧 Email Notifications - Step by Step (Super Simple!)

I'll help you set this up. Just follow these steps one by one! 😊

---

## 🎯 What We're Doing (In Simple Words)

When someone books an appointment on your website, you'll get an email at `aairahomeobihar@gmail.com` automatically!

---

## Step 1: Get FREE Resend Account (2 minutes) ✅

**What is Resend?** It's a service that sends emails for FREE (3000 emails/month)

1. **Open**: [https://resend.com](https://resend.com) in your browser
2. **Click**: "Sign Up" (top right)
3. **Enter**: Your email and password
4. **Verify**: Check your email and click the verification link
5. **Get API Key**:
   - Once logged in, click **"API Keys"** in the left menu
   - Click **"Create API Key"** button
   - Name it: `appointment-notifications`
   - Click **"Add"**
   - **COPY the key** (it starts with `re_...`)
   - **SAVE IT** somewhere (you'll need it in Step 2)

**Done with Step 1?** ✅ Great! Move to Step 2.

---

## Step 2: Add Secrets to Supabase (3 minutes) ✅

**What are secrets?** They're passwords/keys that only Supabase can see (secure!)

1. **Open**: [Supabase Dashboard](https://supabase.com/dashboard/project/gzdnefbqxmgjdoztozov)
2. **Click**: **Edge Functions** in the left menu
3. **Click**: **Settings** tab (top)
4. **Click**: **Secrets** section
5. **Add Secret 1**:
   - Click **"Add new secret"** button
   - **Name**: Type `RESEND_API_KEY`
   - **Value**: Paste the API key you copied from Step 1 (the `re_...` one)
   - Click **"Save"**
6. **Add Secret 2**:
   - Click **"Add new secret"** again
   - **Name**: `DOCTOR_EMAIL`
   - **Value**: `aairahomeobihar@gmail.com`
   - Click **"Save"**
7. **Add Secret 3**:
   - Click **"Add new secret"** again
   - **Name**: `FROM_EMAIL`
   - **Value**: `notifications@resend.dev`
   - Click **"Save"`
8. **Add Secret 4**:
   - Click **"Add new secret"** again
   - **Name**: `EMAIL_SERVICE`
   - **Value**: `resend`
   - Click **"Save"`

**You should see 4 secrets saved!** ✅

**Done with Step 2?** Great! Move to Step 3.

---

## Step 3: Install Supabase CLI (2 minutes) ✅

**What is CLI?** It's a tool that lets us deploy the email function.

### ⚠️ IMPORTANT: npm install doesn't work for Supabase CLI on Windows!

**Use one of these methods instead:**

### Option A: Use Scoop (Easiest for Windows)

1. **Install Scoop** (if not installed):
   - Open PowerShell (Run as Administrator)
   - Run: `iwr -useb get.scoop.sh | iex`
   
2. **Add Supabase bucket**:
   ```powershell
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   ```

3. **Install Supabase CLI**:
   ```powershell
   scoop install supabase
   ```

4. **Verify it worked**:
   ```powershell
   supabase --version
   ```

### Option B: Download Windows Installer (Simple!)

1. **Go to**: [https://github.com/supabase/cli/releases](https://github.com/supabase/cli/releases)
2. **Download**: Latest `supabase_X.X.X_windows_amd64.zip`
3. **Extract** the zip file
4. **Copy** `supabase.exe` to a folder (e.g., `C:\supabase\`)
5. **Add to PATH**:
   - Press `Win + X` → System → Advanced system settings
   - Click "Environment Variables"
   - Under "System variables", find "Path" → Edit
   - Click "New" → Add `C:\supabase`
   - Click OK on all windows

6. **Verify**: Open new PowerShell and run:
   ```powershell
   supabase --version
   ```

**Done with Step 3?** Great! Move to Step 4.

---

## Step 4: Login to Supabase (1 minute) ✅

1. **Open PowerShell** in your project folder
2. **Type** and press Enter:
   ```powershell
   supabase login
   ```
3. **Browser opens automatically**
4. **Click**: "Authorize" button
5. **Done!** ✅ You'll see "Logged in as..." in PowerShell

**Done with Step 4?** Great! Move to Step 5.

---

## Step 5: Link Your Project (30 seconds) ✅

**In PowerShell**, type:

```powershell
cd c:\Users\suraj\OneDrive\Desktop\aairahomeo
supabase link --project-ref gzdnefbqxmgjdoztozov
```

Press Enter. You'll see "Linked to project..." ✅

**Done with Step 5?** Great! Move to Step 6.

---

## Step 6: Deploy the Email Function (2 minutes) ✅

**In PowerShell**, type:

```powershell
supabase functions deploy send-email-notification
```

Press Enter. Wait 1-2 minutes...

You'll see: **"Deployed successfully"** ✅

**Done with Step 6?** Great! Move to Step 7.

---

## Step 7: Get Service Role Key (1 minute) ✅

1. **Go to**: [Supabase Dashboard](https://supabase.com/dashboard/project/gzdnefbqxmgjdoztozov)
2. **Click**: **Settings** (bottom left)
3. **Click**: **API** (left menu)
4. **Find**: **service_role** (under "Project API keys")
5. **Click**: 👁️ (eye icon) to reveal it
6. **COPY** the key (long string starting with `eyJ...`)
7. **SAVE IT** somewhere - you'll need it in Step 8!

**Done with Step 7?** Great! Move to Step 8.

---

## Step 8: Create Webhook (3 minutes) ✅

**What is a webhook?** It's like a button that says "Hey, send email when appointment is created!"

1. **Go to**: [Supabase Dashboard](https://supabase.com/dashboard/project/gzdnefbqxmgjdoztozov)
2. **Click**: **Database** (left menu)
3. **Click**: **Webhooks** (left menu, under Database)
4. **Click**: **New Webhook** button (top right)
5. **Fill in**:
   
   **Basic Info:**
   - **Name**: `email_notification`
   - **Table**: Click dropdown, select `appointments`
   - **Events**: Check ✅ **INSERT** (uncheck others)

   **HTTP Request:**
   - **URL**: `https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-email-notification`
   - **Method**: Select `POST` from dropdown
   - **HTTP Headers**:
     - Click **"Add header"**
     - **Key**: `Authorization`
     - **Value**: `Bearer YOUR_SERVICE_ROLE_KEY` (replace `YOUR_SERVICE_ROLE_KEY` with the key from Step 7!)
     - Click **"Add header"** again
     - **Key**: `Content-Type`
     - **Value**: `application/json`
   - **HTTP Request Body**:
     ```json
     {"record": $1}
     ```

6. **Click**: **Save** (bottom right)

**Done with Step 8?** Great! Move to Step 9.

---

## Step 9: Test It! 🎉 ✅

1. **Open**: Your website (the clinic website)
2. **Click**: "Book Appointment" button
3. **Fill the form**:
   - Name: Test Patient
   - Phone: 1234567890
   - Email: test@example.com
   - Age: 30
   - Problem: Test appointment
4. **Click**: Submit
5. **Check**: `aairahomeobihar@gmail.com` inbox (and spam folder!)
6. **You should receive email!** 🎉

---

## 🆘 Troubleshooting

### "Supabase CLI not found"?
- Make sure Step 3 completed successfully
- Try: `npm install -g supabase` again

### "No email received"?
1. Check **Spam folder**
2. Check **Supabase Logs**: Dashboard → Edge Functions → Logs
3. Make sure all 4 secrets are saved correctly
4. Verify webhook URL is correct

### "Webhook not working"?
1. Make sure service role key is correct
2. Check webhook events - only `INSERT` should be checked
3. Try deleting and recreating the webhook

### Need Help?
**Tell me which step you're on and I'll help!** 😊

---

## ✅ Quick Checklist

- [ ] Step 1: Got Resend API key
- [ ] Step 2: Added 4 secrets to Supabase
- [ ] Step 3: Installed Supabase CLI
- [ ] Step 4: Logged in to Supabase
- [ ] Step 5: Linked project
- [ ] Step 6: Deployed function
- [ ] Step 7: Got service role key
- [ ] Step 8: Created webhook
- [ ] Step 9: Tested and received email! 🎉

**All checked?** You're done! 🚀

---

**Need help with any step? Just ask!** 😊

