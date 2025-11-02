# Backend API for Appointment Bookings

This Node.js backend handles appointment submissions and sends email notifications.

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in:

   **Get Supabase Service Role Key:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard/project/gzdnefbqxmgjdoztozov)
   - Settings → API → Copy `service_role` key (secret key)

   **Get Gmail App Password:**
   - Go to [Google Account](https://myaccount.google.com)
   - Security → 2-Step Verification (enable if not already)
   - App Passwords → Generate
   - Select "Mail" and "Other" → Name: "Aaira Homeo Backend"
   - Copy the 16-character password

3. Fill `.env`:
   ```env
   SUPABASE_URL=https://gzdnefbqxmgjdoztozov.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ADMIN_EMAIL=aairahomeobihar@gmail.com
   ADMIN_APP_PASSWORD=your_16_char_app_password
   PORT=3001
   ```

### 3. Start Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:3001`

### 4. Test

Visit: `http://localhost:3001/api/health`

You should see:
```json
{
  "status": "ok",
  "message": "Appointment API is running"
}
```

---

## 📧 Email Setup (Gmail)

### Important: Use App Password, Not Regular Password!

1. **Enable 2-Step Verification**:
   - Google Account → Security → 2-Step Verification → Turn on

2. **Generate App Password**:
   - Security → App Passwords
   - Select "Mail" and "Other"
   - Name: "Aaira Homeo Backend"
   - Copy the 16-character password (looks like: `abcd efgh ijkl mnop`)

3. **Use in `.env`**:
   ```env
   ADMIN_APP_PASSWORD=abcdefghijklmnop  # Remove spaces!
   ```

⚠️ **Never use your regular Gmail password** - it won't work!

---

## 🔗 Frontend Integration

Update your React app to call this backend:

**Before (direct Supabase):**
```javascript
// Old way - direct Supabase
const { data, error } = await supabase
  .from('appointments')
  .insert([appointment]);
```

**After (via Node.js backend):**
```javascript
// New way - via backend API
const response = await fetch('http://localhost:3001/api/appointments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name, phone, email, age, problem, preferred_date, preferred_time
  })
});

const result = await response.json();
```

---

## 📦 Deployment Options

### Option 1: Render (FREE - Recommended)

1. **Sign up**: [render.com](https://render.com) (free)
2. **New Web Service**:
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables: Add all from `.env`
3. **Deploy!**

### Option 2: Railway (FREE)

1. **Sign up**: [railway.app](https://railway.app) (free tier available)
2. **New Project** → Deploy from GitHub
3. **Select**: `backend` folder
4. **Add Environment Variables**
5. **Deploy!**

### Option 3: VPS (DigitalOcean, AWS, etc.)

1. Upload code to server
2. Install Node.js
3. Run `npm install`
4. Use PM2 or systemd to keep it running:
   ```bash
   npm install -g pm2
   pm2 start server.js --name appointment-api
   pm2 save
   pm2 startup
   ```

---

## 🔒 Security Notes

- ✅ Uses service role key (backend only - never expose to frontend!)
- ✅ Input validation and sanitization
- ✅ CORS enabled for your frontend domain
- ✅ Error handling
- ✅ Gmail App Password (more secure than regular password)

---

## 📝 API Endpoints

### `POST /api/appointments`

Submit a new appointment.

**Request:**
```json
{
  "name": "John Doe",
  "phone": "+917488467727",
  "email": "patient@example.com",
  "age": "30",
  "problem": "Skin issue",
  "preferred_date": "2025-01-20",
  "preferred_time": "10:00 AM"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment request submitted successfully!",
  "data": {
    "id": "uuid-here",
    "name": "John Doe",
    "status": "pending"
  }
}
```

### `GET /api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Appointment API is running",
  "timestamp": "2025-01-02T10:00:00.000Z"
}
```

---

## 🐛 Troubleshooting

### "Email not sending"?

1. Check Gmail App Password is correct
2. Verify 2-Step Verification is enabled
3. Check server logs for error messages
4. Test email connection manually:
   ```javascript
   // In Node.js console
   transporter.verify((error, success) => {
     if (error) console.log(error);
     else console.log('Email ready!');
   });
   ```

### "Supabase error"?

1. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
2. Check Supabase dashboard for table structure
3. Ensure `appointments` table exists

### "Port already in use"?

Change `PORT` in `.env` to another number (e.g., `3002`)

---

## ✅ Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with all variables
- [ ] Gmail App Password generated and added
- [ ] Supabase Service Role Key added
- [ ] Server starts without errors
- [ ] Health check endpoint works
- [ ] Test appointment submission
- [ ] Email received at `aairahomeobihar@gmail.com`

---

**Ready to deploy!** 🚀

