# ⚠️ SECURITY ALERT: API Keys Exposed

## 🚨 Issue Found

Real API keys were exposed in `DEPLOY_BACKEND_EASY.md` which was pushed to GitHub.

**Exposed Keys:**
- Supabase Service Role Key
- Resend API Key

---

## ✅ What I Fixed

1. ✅ Removed real keys from `DEPLOY_BACKEND_EASY.md` → replaced with placeholders
2. ✅ Updated `backend/.env.example` to use placeholders (local file had real keys)

---

## 🔒 CRITICAL: Rotate Your Keys

Since these keys were pushed to a public GitHub repo, you MUST rotate them:

### 1. **Rotate Supabase Service Role Key**

**Option A: Regenerate (Recommended)**
1. Go to: https://supabase.com/dashboard/project/gzdnefbqxmgjdoztozov/settings/api
2. Scroll to "Project API keys"
3. Click **"Reset service_role key"** (or generate new)
4. **Copy the new key**
5. Update:
   - `backend/.env` file (local)
   - Railway environment variables (when you deploy)

**Option B: Keep Current (Less Secure)**
- Only if your repo is private (check: https://github.com/arogyamclinicare/aairahomeo)
- If public, MUST rotate!

---

### 2. **Rotate Resend API Key**

1. Go to: https://resend.com/api-keys
2. Click **"Create API Key"** or **"Revoke"** old one
3. **Copy the new key**
4. Update:
   - `backend/.env` file (local)
   - Railway environment variables (when you deploy)

---

## 📝 Next Steps

1. **Rotate keys** (see above)
2. **Update `backend/.env`** with new keys
3. **Test backend** still works
4. **Push the security fix** (I'll do this next)

---

## ✅ After Rotating

Your backend will continue working, but you'll need to:
- Update `backend/.env` locally
- Update Railway env vars when deploying
- The exposed keys will stop working (which is good for security)

---

**This is a security best practice - always rotate keys after exposure!**

