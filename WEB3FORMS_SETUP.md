# 📧 Web3Forms Setup Guide

**The Easiest Way to Get Email Notifications** - No backend server needed!

## ✅ Why Web3Forms?

- ✅ **100% Free** - 250 submissions/month (more than enough for a clinic)
- ✅ **No Backend Needed** - Direct API call from frontend
- ✅ **No Deployment** - Works instantly with just an API key
- ✅ **Spam Protection** - Built-in honeypot and rate limiting
- ✅ **Email Delivery** - Reliable email delivery service
- ✅ **Simple Setup** - 2 minutes to configure

## 🚀 Quick Setup (2 Minutes)

### Step 1: Get Your Web3Forms Access Key

1. Visit [https://web3forms.com](https://web3forms.com)
2. Click **"Get Your Access Key"** (top right)
3. Enter your email address (`aairahomeobihar@gmail.com`)
4. Check your email and click the verification link
5. Copy your **Access Key** (looks like: `abc123-def456-ghi789`)

### Step 2: Add to Environment Variables

**For Local Development:**

1. Open `.env` file in the project root
2. Add your access key:

```env
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
VITE_ADMIN_EMAIL=aairahomeobihar@gmail.com
```

**For Vercel (Production):**

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add:
   - **Key**: `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value**: `your_access_key_here`
4. Add:
   - **Key**: `VITE_ADMIN_EMAIL`
   - **Value**: `aairahomeobihar@gmail.com`
5. Click **Save**
6. **Redeploy** your site (important!)

### Step 3: Test It

1. Start your dev server: `npm run dev`
2. Fill out the appointment form
3. Submit it
4. Check your email inbox (`aairahomeobihar@gmail.com`)
5. You should receive a formatted email with all appointment details! 🎉

## 📧 What You'll Receive

When someone submits the appointment form, you'll get an email like this:

```
🎯 New Appointment Request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: John Doe
📞 Phone: (123) 456-7890
🎂 Age: 35
📧 Email: john@example.com
📅 Preferred Date: 2024-01-15
⏰ Preferred Time: Morning

📋 Problem/Message:
I need help with chronic skin condition.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ Submitted at: 1/10/2024, 3:45:00 PM
```

## 🔧 Configuration Options

### Change Email Subject

Edit `src/services/appointmentService.ts`:

```typescript
formData.append('subject', 'Your Custom Subject Here');
```

### Change Recipient Email

Update in `.env`:

```env
VITE_ADMIN_EMAIL=your-other-email@example.com
```

Or set multiple recipients in Web3Forms dashboard.

## 🗄️ Optional: Save to Supabase Too

If you want to keep database records **in addition** to emails:

1. Add Supabase credentials to `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

The system will automatically:
- ✅ Send email via Web3Forms (primary)
- ✅ Save to Supabase database (backup/records)

If Supabase isn't configured, emails still work perfectly!

## 🆓 Free Tier Limits

- **250 submissions/month** (more than enough for a clinic)
- **Unlimited emails** - all submissions forwarded to your email
- **No credit card required**

If you need more, paid plans start at $5/month.

## ✅ Troubleshooting

### "Email service is not configured"

- Make sure `VITE_WEB3FORMS_ACCESS_KEY` is set in `.env`
- Restart your dev server after adding the key
- Check that the key doesn't have extra spaces

### "Failed to submit appointment"

- Verify your access key is correct on [web3forms.com](https://web3forms.com)
- Check browser console for error details
- Make sure your internet connection is working

### Not Receiving Emails

1. Check spam/junk folder
2. Verify email address in Web3Forms dashboard
3. Check Web3Forms dashboard for submission logs
4. Try resubmitting the form

### Production (Vercel) Not Working

- Make sure environment variables are set in Vercel dashboard
- **Redeploy** your site after adding environment variables
- Check Vercel build logs for any errors

## 🎉 You're Done!

That's it! Your form will now send emails directly to `aairahomeobihar@gmail.com` whenever someone submits an appointment request.

**No backend server needed. No deployment. Just works!** ✨

---

## 📚 More Info

- Web3Forms Docs: [https://docs.web3forms.com](https://docs.web3forms.com)
- Support: [support@web3forms.com](mailto:support@web3forms.com)

