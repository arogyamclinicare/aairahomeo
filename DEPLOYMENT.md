# Deployment Guide 🚀

Complete guide for deploying Aaira Homeo Clinic website to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Supabase database migrations applied
- [ ] All tests passing (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] Production build successful (`npm run build:prod`)
- [ ] Privacy policy and terms updated
- [ ] Contact information verified
- [ ] SSL certificate configured
- [ ] Domain name configured

## Environment Variables

Ensure these are set in your hosting platform:

```bash
VITE_SUPABASE_URL=https://gzdnefbqxmgjdoztozov.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Vercel Deployment (Recommended)

### Step 1: Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select the repository

### Step 2: Configure Project
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Add Environment Variables
Go to Project Settings > Environment Variables:
- Add `VITE_SUPABASE_URL`
- Add `VITE_SUPABASE_ANON_KEY`

### Step 4: Deploy
Click "Deploy" and wait for build to complete.

### Step 5: Custom Domain (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS as instructed

## Netlify Deployment

### Step 1: Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub

### Step 2: Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Step 3: Environment Variables
Go to Site Settings > Environment Variables:
- Add `VITE_SUPABASE_URL`
- Add `VITE_SUPABASE_ANON_KEY`

### Step 4: Deploy
Netlify will automatically deploy on every push to main branch.

## Manual Deployment

### Step 1: Build
```bash
npm run build:prod
```

### Step 2: Upload
Upload the contents of `dist/` folder to your web server.

### Step 3: Configure Server
Ensure your server:
- Serves static files correctly
- Has proper MIME types configured
- Has HTTPS enabled
- Has proper caching headers

### Nginx Configuration Example
```nginx
server {
    listen 80;
    server_name aairahomeo.com;
    
    root /var/www/aairahomeo/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## Post-Deployment

### Verify Checklist
- [ ] Website loads correctly
- [ ] All images load
- [ ] Forms submit successfully
- [ ] Supabase connection works
- [ ] Mobile responsive design works
- [ ] SSL certificate valid
- [ ] Privacy policy accessible
- [ ] Cookie consent shows on first visit
- [ ] Error boundary works (test by breaking something)

### Performance Check
Run Lighthouse audit:
```bash
# Using Chrome DevTools
# Open DevTools > Lighthouse > Run audit
```

Target scores:
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 100

### Monitoring Setup
1. Set up error tracking (Sentry, LogRocket, etc.)
2. Set up analytics (Google Analytics, Plausible, etc.)
3. Monitor Supabase usage
4. Set up uptime monitoring

## Rollback Procedure

If something goes wrong:

### Vercel
1. Go to Deployments
2. Find last working deployment
3. Click "..." > "Promote to Production"

### Netlify
1. Go to Deployments
2. Find last working deployment
3. Click "..." > "Publish deploy"

### Manual
1. Revert code changes
2. Rebuild: `npm run build:prod`
3. Re-upload to server

## Troubleshooting

### Build Fails
- Check Node.js version (need 18+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors
- Verify all dependencies installed

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Rebuild after adding variables
- Check variable names are correct

### Supabase Connection Issues
- Verify Supabase URL and key
- Check Supabase project status
- Verify RLS policies are correct
- Check browser console for errors

## Support

For deployment issues, check:
1. [Vercel Docs](https://vercel.com/docs)
2. [Netlify Docs](https://docs.netlify.com)
3. [Supabase Docs](https://supabase.com/docs)

---

**Ready to deploy? Follow the checklist above and you're good to go! 🚀**

