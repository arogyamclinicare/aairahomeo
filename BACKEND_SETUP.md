# 🚀 Node.js Backend Setup Guide

**Simple Node.js backend that saves appointments to Supabase and sends email notifications!**

---

## 🎯 What This Does

1. **React form** → sends data to Node.js API
2. **Node.js** → saves to Supabase database
3. **After save** → sends email to `aairahomeobihar@gmail.com` automatically!

**Clean, simple, and works perfectly!** ✅

---

## 📦 Step 1: Setup Backend (5 minutes)

### 1.1 Install Dependencies

Open terminal in `backend` folder:

```bash
cd backend
npm install
```

### 1.2 Get Gmail App Password (Important!)

**⚠️ You MUST use App Password, not regular Gmail password!**

1. **Go to**: [Google Account Settings](https://myaccount.google.com)
2. **Security** → **2-Step Verification** (enable if not already)
3. **App Passwords**:
   - Click **"App Passwords"**
   - Select **"Mail"** and **"Other (Custom name)"**
   - Name: `Aaira Homeo Backend`
   - Click **"Generate"**
   - **COPY the 16-character password** (looks like: `abcd efgh ijkl mnop`)

### 1.3 Get Supabase Service Role Key

1. **Go to**: [Supabase Dashboard](https://supabase.com/dashboard/project/gzdnefbqxmgjdoztozov)
2. **Settings** → **API**
3. **Find**: `service_role` key (under "Project API keys")
4. **Click**: 👁️ (eye icon) to reveal
5. **COPY** the key (long string starting with `eyJ...`)

### 1.4 Configure Environment Variables

1. **Copy** `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. **Edit** `.env` file:
   ```env
   SUPABASE_URL=https://gzdnefbqxmgjdoztozov.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ADMIN_EMAIL=aairahomeobihar@gmail.com
   ADMIN_APP_PASSWORD=abcdefghijklmnop
   PORT=3001
   ```

3. **Replace**:
   - `your_service_role_key_here` → Your Supabase service role key
   - `abcdefghijklmnop` → Your Gmail app password (remove spaces!)

---

## 🚀 Step 2: Start Backend Server

### Development Mode (Auto-reload):

```bash
npm run dev
```

### Production Mode:

```bash
npm start
```

**You should see:**
```
🚀 Appointment API server running on port 3001
📧 Email notifications: Configured
🔗 Health check: http://localhost:3001/api/health
```

✅ **Backend is running!**

---

## 🔗 Step 3: Update Frontend (Already Done!)

The frontend has been updated to use the backend API. Just make sure:

1. **Backend is running** (Step 2)
2. **Frontend points to backend**:
   - Development: `http://localhost:3001` (default)
   - Production: Set `VITE_API_URL` in your `.env`

---

## ✅ Step 4: Test It!

1. **Start backend**: `npm start` (in `backend` folder)
2. **Start frontend**: `npm run dev` (in root folder)
3. **Open website** and click "Book Appointment"
4. **Fill the form** and submit
5. **Check**: `aairahomeobihar@gmail.com` inbox
6. **You should receive email!** 🎉

---

## 📧 Email Format

You'll receive a beautiful HTML email with:
- ✅ Patient name, phone, email, age
- ✅ Problem description
- ✅ Preferred date & time
- ✅ Quick WhatsApp link
- ✅ Professional styling

---

## 🌐 Step 5: Deploy Backend (Production)

### Option 1: Render.com (FREE - Recommended) ⭐

1. **Sign up**: [render.com](https://render.com) (free)
2. **New** → **Web Service**
3. **Connect** GitHub repository
4. **Settings**:
   - **Name**: `aaira-homeo-api`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
5. **Environment Variables**:
   - Add all from your `.env` file
6. **Create & Deploy**
7. **Copy the URL** (e.g., `https://aaira-homeo-api.onrender.com`)

8. **Update Frontend**:
   - Add to `.env`: `VITE_API_URL=https://aaira-homeo-api.onrender.com`
   - Or update `backend/server.js` default URL

### Option 2: Railway.app (FREE)

1. **Sign up**: [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. **Select**: `backend` folder
4. **Add Environment Variables**
5. **Deploy!**

### Option 3: VPS (DigitalOcean, AWS, etc.)

```bash
# On your server
cd backend
npm install
npm install -g pm2
pm2 start server.js --name appointment-api
pm2 save
pm2 startup
```

---

## 🔧 Troubleshooting

### "Email not sending"?

1. ✅ Check Gmail App Password is correct (not regular password!)
2. ✅ Verify 2-Step Verification is enabled
3. ✅ Remove spaces from App Password in `.env`
4. ✅ Check server logs for errors

### "Cannot connect to backend"?

1. ✅ Make sure backend is running (`npm start`)
2. ✅ Check backend is on correct port (default: 3001)
3. ✅ Verify `VITE_API_URL` in frontend `.env` matches backend URL

### "Supabase error"?

1. ✅ Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
2. ✅ Check `appointments` table exists in Supabase
3. ✅ Check Supabase dashboard logs

---

## 📝 API Endpoints

### `POST /api/appointments`

Submit new appointment.

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
    "id": "uuid",
    "name": "John Doe",
    "status": "pending"
  }
}
```

### `GET /api/health`

Health check.

**Response:**
```json
{
  "status": "ok",
  "message": "Appointment API is running"
}
```

---

## ✅ Checklist

- [ ] Backend dependencies installed
- [ ] Gmail App Password generated
- [ ] Supabase Service Role Key copied
- [ ] `.env` file configured
- [ ] Backend server starts successfully
- [ ] Health check works (`http://localhost:3001/api/health`)
- [ ] Frontend updated (already done!)
- [ ] Test appointment submitted
- [ ] Email received at `aairahomeobihar@gmail.com`
- [ ] Backend deployed (optional - for production)

---

## 🎉 Done!

**Now every appointment booking will:**
1. ✅ Save to Supabase database
2. ✅ Send email to you automatically!

**No manual work needed!** 🚀

---

**Need help? Check the troubleshooting section or ask!** 😊

