# 📧 FREE Email Notifications Setup Guide

Get instant **FREE** email notifications when someone books an appointment! 🎉

## 🎯 Recommended: Resend (Easiest & Best Free Tier)

**3000 emails/month FREE** - More than enough for a clinic! ⭐

### Step 1: Sign Up for Resend (Free)

1. Go to [https://resend.com](https://resend.com)
2. Sign up for free (no credit card needed!)
3. Verify your email
4. You'll get **3000 emails/month free forever**

### Step 2: Get API Key

1. In Resend Dashboard → **API Keys**
2. Click **Create API Key**
3. Name it: `appointment-notifications`
4. Copy the API key (starts with `re_...`)

### Step 3: Deploy Edge Function

```bash
# If Supabase CLI not installed
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref gzdnefbqxmgjdoztozov

# Deploy
supabase functions deploy send-email-notification
```

### Step 4: Set Environment Variables in Supabase

1. Supabase Dashboard → **Edge Functions** → **Settings** → **Secrets**
2. Add these:
   ```
   RESEND_API_KEY=re_your_api_key_here
   DOCTOR_EMAIL=aairahomeobihar@gmail.com
   FROM_EMAIL=notifications@resend.dev
   EMAIL_SERVICE=resend
   ```

**Note**: `notifications@resend.dev` is a test email. For production:
- Add your domain to Resend (free)
- Use `notifications@yourdomain.com`

### Step 5: Create Database Webhook

1. Supabase Dashboard → **Database** → **Webhooks** → **New Webhook**
2. Configure:
   - **Name**: `email_notification`
   - **Table**: `appointments`
   - **Events**: `INSERT` ✅
   - **HTTP Request**:
     - **URL**: `https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-email-notification`
     - **Method**: `POST`
     - **Headers**:
       ```
       Authorization: Bearer YOUR_SERVICE_ROLE_KEY
       Content-Type: application/json
       ```
     - **Payload**: `{"record": $1}`

### Step 6: Get Service Role Key

1. Supabase Dashboard → **Settings** → **API**
2. Copy **service_role** key (secret key - keep it safe!)
3. Use this in webhook headers

### Step 7: Test It! 🎉

1. Submit a test appointment on your website
2. Check `aairahomeobihar@gmail.com` inbox
3. You should receive a beautifully formatted email!

---

## 📧 Email Format

You'll receive a professional HTML email with:

✅ Patient name, phone, email, age  
✅ Problem description  
✅ Preferred date & time  
✅ Quick WhatsApp link  
✅ Professional styling  

---

## 💰 Free Tier Comparison

| Service | Free Tier | Best For |
|---------|-----------|----------|
| **Resend** ⭐ | 3000 emails/month | Most clinics (recommended) |
| **SendGrid** | 100 emails/day | Smaller clinics |
| **Gmail SMTP** | Unlimited | Manual setup required |

**For a clinic booking 100 appointments/month**: Resend gives you **30x more emails** than you need! 🎁

---

## 🔧 Alternative: SendGrid (Also Free)

### Setup:

1. Sign up at [SendGrid](https://sendgrid.com) (free)
2. Verify your email
3. Get API Key: **Settings** → **API Keys** → **Create**
4. Set secrets in Supabase:
   ```
   SENDGRID_API_KEY=SG.your_api_key
   DOCTOR_EMAIL=aairahomeobihar@gmail.com
   FROM_EMAIL=noreply@aairahomeo.com
   EMAIL_SERVICE=sendgrid
   ```

**Limits**: 100 emails/day (still plenty for most clinics!)

---

## 🆓 Gmail SMTP (Unlimited - But Manual Setup)

For unlimited free emails using your Gmail account:

### Step 1: Enable Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com)
2. **Security** → **2-Step Verification** (enable if not already)
3. **App Passwords** → Generate new app password
4. Select **Mail** and **Other (Custom name)**: "Supabase Notifications"
5. Copy the 16-character password

### Step 2: Use Nodemailer with Supabase (Advanced)

Since Edge Functions don't support SMTP directly, you can:
- Use Resend (easier) ⭐
- Or set up a simple Node.js service (Heroku free tier, Railway free tier, etc.)

**Recommendation**: Use **Resend** - it's easier and the free tier is more than enough! 🎯

---

## ✅ Quick Setup Checklist

- [ ] Resend account created
- [ ] API key generated
- [ ] Edge Function deployed
- [ ] Secrets configured in Supabase
- [ ] Webhook created
- [ ] Service role key added to webhook headers
- [ ] Test appointment submitted
- [ ] Email received! ✅

---

## 🐛 Troubleshooting

### No email received?

1. **Check Supabase Logs**:
   - Dashboard → **Edge Functions** → **Logs**
   - Look for errors in `send-email-notification`

2. **Verify Secrets**:
   - Make sure all secrets are set correctly
   - Check for typos in API keys

3. **Test Edge Function Manually**:
   ```bash
   curl -X POST https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-email-notification \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{
       "record": {
         "name": "Test Patient",
         "phone": "1234567890",
         "email": "test@example.com",
         "age": "30",
         "problem": "Test appointment"
       }
     }'
   ```

4. **Check Spam Folder**: Emails might go to spam initially

5. **Resend Domain**: If using `notifications@resend.dev`, verify it works. For production, add your domain.

### "API key invalid"?

- Make sure you copied the full API key
- Check if API key has proper permissions
- Regenerate if needed

---

## 🎨 Email Customization

Edit `supabase/functions/send-email-notification/index.ts` to customize:
- Email template design
- Colors and branding
- Additional information
- Footer content

---

## 💡 Pro Tips

1. **Add Your Domain**: In Resend, add your domain (`aairahomeo.com`) for professional emails
2. **Multiple Recipients**: Modify function to send to multiple emails
3. **Email Templates**: Use Resend's template feature for better organization
4. **Monitor Usage**: Check Resend dashboard to track email count
5. **Backup Notifications**: Combine email + WhatsApp for redundancy

---

## 📊 Cost Breakdown

| Service | Setup | Monthly Cost | Monthly Limit |
|---------|-------|--------------|---------------|
| **Resend** | 5 min | **FREE** | 3,000 emails |
| **SendGrid** | 5 min | **FREE** | 3,000 emails |
| **Gmail** | 15 min | **FREE** | Unlimited |

**Recommendation**: Use **Resend** - easiest setup, best free tier! 🏆

---

## 🚀 Production Tips

1. **Verify Domain**: Add `aairahomeo.com` to Resend (free) for better deliverability
2. **SPF/DKIM Records**: Resend will provide these automatically
3. **Monitor Delivery**: Check Resend dashboard for delivery rates
4. **Rate Limiting**: Resend free tier is generous - no worries!

---

## 📞 Support

- **Resend Docs**: https://resend.com/docs
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions
- **SendGrid Docs**: https://docs.sendgrid.com

---

**Status**: ✅ Ready to implement. **Resend is the easiest and best free option!** 🎉

**Setup Time**: ~5 minutes  
**Monthly Cost**: **$0 FREE**  
**Emails/Month**: **3,000** (more than enough!)

