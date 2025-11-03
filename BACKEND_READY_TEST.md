# ✅ Backend is Running! - Test Guide

## 🎉 Status: Backend Server is Active!

Your Node.js backend is now running on port 5000.

---

## ✅ Quick Test Steps

### Step 1: Test Backend Health (Optional)
Open browser: http://localhost:5000/api/health

You should see:
```json
{
  "status": "ok",
  "message": "Appointment API is running",
  "timestamp": "..."
}
```

### Step 2: Test Form Submission

1. **Make sure frontend is running:**
   - Open another terminal
   - Run: `npm run dev` (in root folder)
   - Frontend should be on port 3001 (or 3000)

2. **Submit a test appointment:**
   - Go to your website
   - Click "Book Appointment"
   - Fill in:
     - Name: "Test Patient"
     - Phone: Your number (to verify)
     - Age: 25
     - Problem: "Testing email notifications"
   - Click Submit

3. **Check backend console:**
   - You should see:
     ```
     ✅ Email sent successfully
     ```
   - OR if error:
     ```
     Email error: [error details]
     ```

4. **Check your email:**
   - Go to: `aairahomeobihar@gmail.com`
   - You should receive an email with appointment details!

---

## 🔍 What to Check

### ✅ If Everything Works:

**Backend Console:**
```
✅ Email sent successfully
```

**Your Email:**
- Subject: "🩺 New Appointment Enquiry"
- Contains: Patient name, phone, problem, etc.
- Beautiful HTML email!

---

### ❌ If Something Fails:

**Check Backend Console for errors:**
- "Supabase error" → Check `.env` has correct Supabase keys
- "Resend API error" → Check Resend API key
- "Failed to send email" → Check Resend dashboard

**Check Resend Dashboard:**
- Go to [resend.com/emails](https://resend.com/emails)
- See if email was attempted/sent
- Check error messages

---

## 🎯 Expected Flow

```
User submits form on website
    ↓
Frontend → POST http://localhost:5000/newAppointment
    ↓
Backend receives request
    ↓
Backend saves to Supabase ✅
    ↓
Backend sends email via Resend ✅
    ↓
You receive email at aairahomeobihar@gmail.com 📧
```

---

## 🚀 Next Steps

1. ✅ Backend is running
2. ⏳ Test form submission
3. ⏳ Check email inbox
4. ⏳ Verify everything works!

---

## 💡 Pro Tips

- **Keep backend running** while testing
- **Watch backend console** for real-time logs
- **Check spam folder** if email doesn't arrive
- **Backend must stay running** for notifications to work

---

**Ready to test! Submit a form and check your email!** 🎉

