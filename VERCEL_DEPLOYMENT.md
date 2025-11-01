# Vercel Deployment Guide 🚀

## Quick Deploy to Vercel

### Prerequisites
✅ Build successful (`npm run build` passed)  
✅ TypeScript compiles without errors  
✅ Tests passing  
✅ Environment variables ready  

---

## Step-by-Step Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Production-ready deployment"
   git push origin main
   ```

2. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

3. **Import Project**
   - Click "Add New..." → "Project"
   - Select your repository: `aairahomeo`
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` ⚠️ **Change from default `build` to `dist`**
   - **Install Command**: `npm install` (default)

5. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_SUPABASE_URL = https://gzdnefbqxmgjdoztozov.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6ZG5lZmJxeG1namRvenRvem92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MDcyMDksImV4cCI6MjA3NzM4MzIwOX0.LP7Xa5S880fIX-6czwuIC2wzgpvg8TR-Q3WlzULnHPo
   ```

6. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd c:\Users\suraj\OneDrive\Desktop\aairahomeo
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? → No (first time)
   - Project name? → `aaira-homeo-clinic` (or your choice)
   - Directory? → `./`
   - Override settings? → No

4. **Add Environment Variables**
   ```bash
   vercel env add VITE_SUPABASE_URL
   # Paste: https://gzdnefbqxmgjdoztozov.supabase.co
   
   vercel env add VITE_SUPABASE_ANON_KEY
   # Paste your anon key
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Important Configuration

### Build Settings
Make sure these are set correctly in Vercel dashboard:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` ⚠️ |
| Install Command | `npm install` |
| Node.js Version | 18.x or 20.x |

### Environment Variables
Both must be added for production:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

⚠️ **Critical**: Add environment variables BEFORE first deployment!

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads at `https://your-project.vercel.app`
- [ ] All images display correctly
- [ ] Appointment form works (test submission)
- [ ] Supabase connection working (check browser console)
- [ ] Mobile responsive design works
- [ ] Cookie consent banner appears
- [ ] Privacy policy accessible
- [ ] No console errors

---

## Custom Domain Setup

1. Go to Project Settings → Domains
2. Add your domain: `aairahomeo.com`
3. Configure DNS:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A record as instructed by Vercel
4. Wait for SSL certificate (automatic, ~2 minutes)

---

## Troubleshooting

### Build Fails
- ✅ Check Node.js version (need 18+)
- ✅ Verify `dist` is set as output directory (not `build`)
- ✅ Check environment variables are added
- ✅ Review build logs in Vercel dashboard

### Environment Variables Not Working
- ✅ Ensure variables start with `VITE_`
- ✅ Redeploy after adding variables
- ✅ Check variable names match exactly

### Supabase Connection Issues
- ✅ Verify Supabase URL and key are correct
- ✅ Check Supabase project is active
- ✅ Ensure RLS policies allow anon inserts
- ✅ Check browser console for errors

### Images Not Loading
- ✅ Verify images are in `public/images/` folder
- ✅ Check image paths in code
- ✅ Ensure images are committed to Git

---

## Automatic Deployments

Vercel automatically deploys on:
- ✅ Every push to `main` branch
- ✅ Pull request creation (preview deployments)

You can disable this in Project Settings → Git.

---

## Performance Optimization

Vercel automatically:
- ✅ Enables CDN for all assets
- ✅ Provides SSL certificates
- ✅ Optimizes images
- ✅ Caches static assets

Your build is already optimized with:
- ✅ Code splitting
- ✅ Minification
- ✅ Tree shaking

---

## Success! 🎉

Once deployed, your website will be:
- ✅ Live on the internet
- ✅ Fast (Vercel CDN)
- ✅ Secure (HTTPS)
- ✅ Automatically deployed on every push

**Your site URL**: `https://your-project.vercel.app`

---

**Ready to deploy? Follow Option 1 above! 🚀**

