# Aairah Homeo Clinic Website

A modern, responsive, and professional homeopathy clinic website built with React, TypeScript, and Tailwind CSS.

![Aairah Homeo Clinic](figma:asset/c41cdf6ccf91df918cc321776596c108e8cf835b.png)

## 🌟 Features

- **Modern Design**: Clean, professional medical website with natural healing aesthetic
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Premium transitions and micro-interactions throughout
- **Appointment Booking**: Easy-to-use appointment request form
- **WhatsApp Integration**: Floating WhatsApp button for instant communication
- **Interactive Navigation**: Sticky header with smooth scroll navigation
- **Testimonials**: Patient success stories and reviews
- **FAQ Section**: Comprehensive information about homeopathy
- **Google Maps**: Integrated location map for easy clinic finding

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd aairah-homeo-clinic

   # Or download and extract the ZIP file
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📁 Project Structure

```
aairah-homeo-clinic/
├── components/
│   ├── Header.tsx              # Sticky navigation header
│   ├── Hero.tsx                # Hero section with doctor intro
│   ├── TrustBadges.tsx         # Trust indicators banner
│   ├── AboutDoctor.tsx         # Doctor information section
│   ├── Treatments.tsx          # Treatments and specialties
│   ├── Testimonials.tsx        # Patient testimonials
│   ├── ClinicInfo.tsx          # Clinic hours, address, map
│   ├── FAQ.tsx                 # Frequently asked questions
│   ├── CTASection.tsx          # Call-to-action section
│   ├── Footer.tsx              # Footer with contact info
│   ├── AppointmentDialog.tsx   # Appointment booking modal
│   ├── WhatsAppButton.tsx      # Floating WhatsApp button
│   └── ui/                     # Reusable UI components
├── styles/
│   └── globals.css             # Global styles and animations
├── App.tsx                     # Main application component
└── README.md                   # This file
```

## 🎨 Customization Guide

### Update Doctor Information

**File: `components/Hero.tsx` and `components/AboutDoctor.tsx`**

```tsx
// Change doctor name
<h1 className="text-gray-900">
  Dr. Your Name Here
</h1>

// Update qualifications, languages, etc.
```

### Update Contact Information

**File: `components/ClinicInfo.tsx` and `components/Footer.tsx`**

```tsx
// Update phone number
<a href="tel:+91XXXXXXXXXX">+91 XXXXX XXXXX</a>

// Update email
<a href="mailto:your-email@example.com">your-email@example.com</a>

// Update address
<p className="text-gray-600">
  Your Clinic Name<br />
  Your Address Line 1<br />
  Your Address Line 2<br />
  City, State - PIN<br />
  Country
</p>
```

### Update WhatsApp Number

**File: `components/WhatsAppButton.tsx`**

```tsx
// Line 10: Update phone number (format: countrycode + number without +)
const phoneNumber = '919876543210'; // Change to your number
```

### Update Clinic Hours

**File: `components/ClinicInfo.tsx`**

```tsx
// Update timings
<div className="flex justify-between">
  <span>Morning:</span>
  <span>9:00 AM - 1:00 PM</span> {/* Change as needed */}
</div>
<div className="flex justify-between">
  <span>Evening:</span>
  <span>5:00 PM - 8:30 PM</span> {/* Change as needed */}
</div>
```

### Update Google Map Location

**File: `components/ClinicInfo.tsx`**

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your clinic location
3. Click "Share" → "Embed a map"
4. Copy the iframe URL
5. Replace the `src` attribute in the iframe:

```tsx
<iframe
  src="YOUR_GOOGLE_MAPS_EMBED_URL_HERE"
  // ... other props
></iframe>
```

### Change Color Scheme

**File: `styles/globals.css`**

The website uses emerald/teal colors. To change:

1. Find and replace color values in Tailwind classes:
   - `emerald-` → your preferred color
   - `teal-` → your preferred accent color

Common files to update:
- `components/Hero.tsx`
- `components/TrustBadges.tsx`
- `components/CTASection.tsx`

### Update Treatments/Specialties

**File: `components/Treatments.tsx`**

```tsx
// Add, remove, or modify treatments
const treatments = [
  {
    icon: Sparkles,
    title: 'Your Treatment',
    description: 'Description of treatment',
    color: 'emerald' // or 'teal' or 'cyan'
  },
  // ... more treatments
];
```

### Update Testimonials

**File: `components/Testimonials.tsx`**

```tsx
// Add your actual patient testimonials
const testimonials = [
  {
    name: 'Patient Name',
    age: 35,
    condition: 'Condition Treated',
    image: 'image-url',
    rating: 5,
    text: "Testimonial text...",
    initials: 'PN'
  },
  // ... more testimonials
];
```

### Update FAQ

**File: `components/FAQ.tsx`**

```tsx
// Add, remove, or modify FAQs
const faqs = [
  {
    question: 'Your question?',
    answer: 'Your detailed answer...'
  },
  // ... more FAQs
];
```

## 🔧 Appointment Form Setup

The appointment form is currently set up to log data to the console. To connect it to an actual backend:

**File: `components/AppointmentDialog.tsx`**

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Replace this with your API call
  try {
    const response = await fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      setIsSubmitted(true);
      // ... success handling
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('Failed to submit appointment');
  }
};
```

### Email Service Integration Options

1. **EmailJS** (Free tier available)
2. **SendGrid** (Free tier: 100 emails/day)
3. **Mailgun** (Free tier: 5000 emails/month)
4. **Custom Backend** (Node.js, PHP, etc.)

## 📱 Social Media Links

**File: `components/Footer.tsx`**

```tsx
// Update Facebook link
<a href="https://facebook.com/yourpage" ...>

// Update Instagram link
<a href="https://instagram.com/yourpage" ...>
```

## 🎯 SEO Optimization

Add to your `index.html` (or create if not exists):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aairah Homeo Clinic - Classical Homeopathy Treatment</title>
    <meta name="description" content="Expert homeopathic treatment with 13+ years experience. Natural healing for chronic diseases, skin problems, respiratory issues, and more." />
    <meta name="keywords" content="homeopathy, classical homeopathy, natural healing, holistic medicine" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

This creates a `dist` folder with optimized production files.

### Deployment Options

1. **Vercel** (Recommended - Free)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify** (Free)
   - Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

3. **GitHub Pages** (Free)
   - Push to GitHub
   - Enable GitHub Pages in repository settings

4. **Traditional Hosting** (cPanel, etc.)
   - Upload contents of `dist` folder to public_html

## 📦 Key Dependencies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **Motion (Framer Motion)** - Animations

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Then restart
npm run dev
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images Not Loading
- Ensure image files are in the correct path
- Check browser console for 404 errors
- Verify image import statements

## 📞 Support

For any issues or questions:
- Check the documentation above
- Review component files for inline comments
- Contact: info@aairahomeo.com

## 📄 License

This project is created for Aairah Homeo Clinic. All rights reserved.

---

**Built with ❤️ for holistic healing**

*Last Updated: October 30, 2025*
