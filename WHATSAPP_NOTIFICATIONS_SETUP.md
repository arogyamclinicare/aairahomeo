# 📱 WhatsApp Notifications Setup Guide

Get instant WhatsApp notifications when someone books an appointment on your website!

> 💡 **Want something FREE?** Check out [EMAIL_NOTIFICATIONS_SETUP.md](./EMAIL_NOTIFICATIONS_SETUP.md) for **FREE email notifications** using Resend (3000 emails/month free)!

## 🎯 Quick Setup (Choose One Method)

### Option 1: Twilio WhatsApp API (Recommended - Easiest) ⭐

**Best for:** Quick setup, no Meta Business verification needed

#### Step 1: Sign Up for Twilio

1. Go to [https://www.twilio.com](https://www.twilio.com)
2. Sign up for a free account (includes $15 credit)
3. Verify your phone number

#### Step 2: Enable WhatsApp Sandbox

1. In Twilio Console → **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Follow instructions to join the sandbox (send code to Twilio number)
3. Copy your:
   - **Account SID** (from Dashboard)
   - **Auth Token** (from Dashboard - click to reveal)

#### Step 3: Deploy Supabase Edge Function

1. **Install Supabase CLI** (if not installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link your project**:
   ```bash
   supabase link --project-ref gzdnefbqxmgjdoztozov
   ```

4. **Deploy the Edge Function**:
   ```bash
   supabase functions deploy send-whatsapp-notification
   ```

#### Step 4: Set Environment Variables in Supabase

1. Go to Supabase Dashboard → **Edge Functions** → **Settings**
2. Add these secrets:
   ```
   TWILIO_ACCOUNT_SID=your_account_sid_here
   TWILIO_AUTH_TOKEN=your_auth_token_here
   DOCTOR_PHONE=+917488467727
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   WHATSAPP_SERVICE=twilio
   ```

#### Step 5: Create Database Trigger

1. Go to Supabase Dashboard → **SQL Editor**
2. Run the migration:
   ```sql
   -- Copy contents of supabase/migrations/002_create_whatsapp_notification_trigger.sql
   ```

3. **Enable HTTP extension** (if needed):
   ```sql
   CREATE EXTENSION IF NOT EXISTS http;
   ```

4. **Set service role key** (required for trigger):
   ```sql
   -- In Supabase Dashboard → Settings → API → Copy "service_role" key
   -- Then set it as a database setting (one-time setup)
   ALTER DATABASE postgres SET app.settings.service_role_key = 'your_service_role_key_here';
   ```

#### Step 6: Test It!

1. Submit a test appointment through your website
2. You should receive WhatsApp message on **+917488467727**

---

### Option 2: WhatsApp Business API (Meta) 📘

**Best for:** Production use, higher message limits

#### Requirements:
- Meta Business Account
- WhatsApp Business API approved account
- Phone number verification

#### Step 1: Set Up Meta Business Account

1. Go to [Meta for Developers](https://developers.facebook.com)
2. Create a Business account
3. Create a WhatsApp App
4. Get your:
   - **Access Token**
   - **Phone Number ID**
   - **Business Account ID**

#### Step 2: Deploy Edge Function & Set Secrets

Same as Twilio (Steps 3-4 above), but use these secrets:
```
WHATSAPP_API_KEY=your_meta_access_token
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
DOCTOR_PHONE=+917488467727
WHATSAPP_SERVICE=whatsapp-api
```

---

### Option 3: MessageBird 📨

**Best for:** Alternative to Twilio

1. Sign up at [MessageBird](https://www.messagebird.com)
2. Enable WhatsApp channel
3. Get API key and channel ID
4. Set secrets:
```
WHATSAPP_API_KEY=your_messagebird_api_key
WHATSAPP_API_URL=https://rest.messagebird.com
MESSAGEBIRD_WHATSAPP_CHANNEL_ID=your_channel_id
DOCTOR_PHONE=+917488467727
WHATSAPP_SERVICE=messagebird
```

---

## 🔧 Alternative: Simple Webhook (No Edge Function)

If you don't want to use Edge Functions, you can use a **database webhook**:

### Using Make.com (formerly Integromat) or Zapier:

1. **Create a webhook** in Make.com/Zapier
2. In Supabase Dashboard → **Database** → **Webhooks**
3. Create webhook:
   - **Name**: `whatsapp_notification`
   - **Table**: `appointments`
   - **Events**: `INSERT`
   - **URL**: Your webhook URL from Make.com/Zapier
   - **HTTP Method**: `POST`

4. Configure Make.com/Zapier to:
   - Receive webhook data
   - Format message
   - Send WhatsApp message (using Twilio integration)

---

## 📱 Message Format

The notification will include:
```
🩺 New Appointment Booking

Patient Name: [Name]
Phone: [Phone]
Age: [Age]
Email: [Email]
Problem: [Problem Description]
Preferred Date: [Date]
Preferred Time: [Time]
Status: pending

📅 Submitted: [Timestamp]
```

---

## ✅ Testing Checklist

- [ ] Edge Function deployed successfully
- [ ] Environment variables set in Supabase
- [ ] Database trigger created
- [ ] HTTP extension enabled
- [ ] Service role key configured
- [ ] Test appointment submitted
- [ ] WhatsApp message received

---

## 🐛 Troubleshooting

### No WhatsApp message received?

1. **Check Supabase Logs**:
   - Dashboard → **Edge Functions** → **Logs**
   - Look for errors in `send-whatsapp-notification`

2. **Check Database Trigger**:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'trigger_notify_whatsapp_on_appointment';
   ```

3. **Test Edge Function Manually**:
   ```bash
   curl -X POST https://gzdnefbqxmgjdoztozov.supabase.co/functions/v1/send-whatsapp-notification \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{"record": {"name": "Test", "phone": "1234567890", "age": "30"}}'
   ```

4. **Verify Twilio/WhatsApp API credentials**
5. **Check phone number format** (must include country code: +91)

### "HTTP extension not found"?

Enable it:
```sql
CREATE EXTENSION IF NOT EXISTS http;
```

### "Service role key not set"?

Set it once:
```sql
ALTER DATABASE postgres SET app.settings.service_role_key = 'your_service_role_key';
```

---

## 💡 Pro Tips

1. **Twilio Sandbox Limits**: Free sandbox allows messages only to verified numbers
   - **Upgrade** to production to send to any number
   - Cost: ~$0.005 per message (very affordable)

2. **Message Templates**: For production, register message templates in Twilio/Meta
   - Required for non-sandbox messages
   - Faster delivery, better deliverability

3. **Multiple Recipients**: Modify the Edge Function to send to multiple numbers
   - Add `DOCTOR_PHONE_2`, `DOCTOR_PHONE_3`, etc.
   - Loop through and send to each

4. **Error Notifications**: Add email fallback if WhatsApp fails
   - Send email via Supabase Auth or Resend API
   - Ensures you never miss an appointment

---

## 📊 Cost Estimates

| Service | Setup Cost | Per Message |
|---------|------------|--------------|
| **Twilio** | Free | $0.005 (~₹0.40) |
| **Meta WhatsApp API** | Free | Free (after approval) |
| **MessageBird** | Free | Varies by region |

**For 100 appointments/month**: ~₹40-50 with Twilio (very affordable!)

---

## 🔒 Security Notes

- ✅ All API keys stored as Supabase secrets (encrypted)
- ✅ Service role key only used server-side (in trigger)
- ✅ Phone numbers validated before sending
- ✅ Rate limiting prevents spam

---

## 📞 Support

- **Twilio Docs**: https://www.twilio.com/docs/whatsapp
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions
- **WhatsApp Business API**: https://developers.facebook.com/docs/whatsapp

---

**Status**: ✅ Ready to implement. Follow Option 1 (Twilio) for fastest setup! 🚀

