# 🚀 Quick Setup Guide - Aairah Homeo Clinic Website

This guide will help you set up and run the website in any code editor in under 5 minutes!

## ✅ Step-by-Step Setup

### Step 1: Install Node.js (If not already installed)

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (recommended)
3. Install it with default settings
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers for both.

### Step 2: Extract Project Files

1. Extract all project files to a folder (e.g., `aairah-homeo-clinic`)
2. Make sure all files are present:
   ```
   ├── components/
   ├── styles/
   ├── App.tsx
   ├── package.json
   └── README.md
   ```

### Step 3: Open in Code Editor

**Visual Studio Code** (Recommended):
1. Download from [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Install it
3. Open VS Code
4. File → Open Folder → Select your project folder

**Other Editors**:
- WebStorm
- Sublime Text
- Atom
- Any IDE that supports React/TypeScript

### Step 4: Install Dependencies

1. Open **Terminal** in your code editor:
   - VS Code: View → Terminal (or Ctrl + `)
   
2. Run this command:
   ```bash
   npm install
   ```

3. Wait for installation to complete (2-3 minutes)
   - You'll see a progress bar
   - When done, you'll see "added XXX packages"

### Step 5: Start Development Server

1. In the same terminal, run:
   ```bash
   npm run dev
   ```

2. You'll see something like:
   ```
   VITE v4.x.x  ready in 500 ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

3. **Open your browser** and go to: `http://localhost:5173`

🎉 **Website is now running!**

## 🎨 First Things to Customize

### 1. Update Phone Number (Takes 2 minutes)

**Search for:** `+919876543210` in all files and replace with your number

**Files to update:**
- `components/Header.tsx`
- `components/Hero.tsx`
- `components/ClinicInfo.tsx`
- `components/Footer.tsx`
- `components/WhatsAppButton.tsx`
- `components/CTASection.tsx`

**Quick way in VS Code:**
1. Press `Ctrl + Shift + F` (or Cmd + Shift + F on Mac)
2. Search for: `+919876543210`
3. Replace with your number
4. Click "Replace All"

### 2. Update Email Address (Takes 1 minute)

**Search for:** `info@aairahomeo.com` and replace with your email

**Quick way in VS Code:**
1. Press `Ctrl + Shift + F`
2. Search for: `info@aairahomeo.com`
3. Replace with your email
4. Click "Replace All"

### 3. Update Doctor Name (Takes 1 minute)

**Search for:** `Dr. Vijay Kumar` and replace with actual doctor name

**Files:**
- `components/Hero.tsx`
- `components/AboutDoctor.tsx`

### 4. Update Address (Takes 2 minutes)

**File:** `components/ClinicInfo.tsx`

Find this section and update:
```tsx
<p className="text-gray-600">
  Aairah Homeo Clinic<br />
  123 Wellness Avenue, 2nd Floor<br />
  Near Central Hospital<br />
  Green Park, Mumbai - 400001<br />
  Maharashtra, India
</p>
```

### 5. Update Google Maps (Takes 3 minutes)

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your clinic address
3. Click **Share** button
4. Click **Embed a map** tab
5. Click **Copy HTML**
6. Open `components/ClinicInfo.tsx`
7. Find the `<iframe>` tag
8. Replace the `src` attribute value with your map's embed URL

## 📝 Project Structure Overview

```
aairah-homeo-clinic/
│
├── components/
│   ├── Header.tsx           ← Navigation bar
│   ├── Hero.tsx             ← Top section with doctor
│   ├── AboutDoctor.tsx      ← Doctor information
│   ├── Treatments.tsx       ← Treatment cards
│   ├── Testimonials.tsx     ← Patient reviews
│   ├── ClinicInfo.tsx       ← Address, hours, map
│   ├── FAQ.tsx              ← Questions & answers
│   ├── CTASection.tsx       ← Call to action
│   ├── Footer.tsx           ← Bottom section
│   ├── AppointmentDialog.tsx ← Booking form
│   └── WhatsAppButton.tsx   ← Floating WhatsApp
│
├── styles/
│   └── globals.css          ← Global styles
│
└── App.tsx                  ← Main app file
```

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 How to Make Website Live

### Option 1: Vercel (Free & Easy - Recommended)

1. Create account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. In your project folder:
   ```bash
   npm run build
   vercel
   ```
4. Follow prompts
5. Your website will be live in 2 minutes!

### Option 2: Netlify (Free)

1. Build your project:
   ```bash
   npm run build
   ```
2. Go to [netlify.com](https://www.netlify.com/)
3. Drag and drop the `dist` folder
4. Done! Website is live!

### Option 3: Traditional Hosting (cPanel, etc.)

1. Build your project:
   ```bash
   npm run build
   ```
2. Upload contents of `dist` folder to your hosting
3. Point your domain to that folder
4. Done!

## 📱 Testing on Mobile

While development server is running:

1. Find your computer's local IP:
   - Windows: `ipconfig` in command prompt
   - Mac/Linux: `ifconfig` in terminal
   
2. On your phone (connected to same WiFi):
   - Open browser
   - Go to: `http://YOUR_IP:5173`
   - Example: `http://192.168.1.100:5173`

## 🆘 Troubleshooting

### "npm: command not found"
→ You need to install Node.js (see Step 1)

### "Port 5173 already in use"
```bash
# Kill the process
npx kill-port 5173
# Then run again
npm run dev
```

### "Module not found" errors
```bash
# Delete and reinstall
rm -rf node_modules
npm install
```

### White screen / Nothing shows
1. Check browser console (F12)
2. Look for error messages
3. Make sure dev server is running

### Images not loading
- The website uses placeholder images
- Update with your actual images
- Check file paths are correct

## 💡 Tips

1. **Save files** - Changes appear automatically (hot reload)
2. **Use Chrome DevTools** - Press F12 to debug
3. **Mobile Testing** - Use browser's mobile view (F12 → Toggle Device Toolbar)
4. **VS Code Extensions** to install:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense

## 📞 Need Help?

If you get stuck:

1. Check the error message in terminal
2. Google the error message
3. Check the detailed README.md file
4. Contact your developer

## ✅ Checklist Before Going Live

- [ ] Updated doctor name
- [ ] Updated phone numbers (all instances)
- [ ] Updated email addresses
- [ ] Updated clinic address
- [ ] Updated Google Maps embed
- [ ] Updated clinic hours
- [ ] Updated WhatsApp number
- [ ] Updated social media links
- [ ] Tested appointment form
- [ ] Tested on mobile devices
- [ ] Updated all placeholder content
- [ ] Tested all navigation links
- [ ] Checked spelling and grammar

## 🎓 Learning Resources

- [React Basics](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**You're all set! 🚀**

Start customizing and make this website your own!
