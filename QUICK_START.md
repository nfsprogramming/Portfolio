# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## ⚡ Installation

```bash
npm install
```

## 🚀 Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✏️ Customize in 5 Steps

### 1. Update Your Name & Title

**File**: `components/sections/Hero.tsx` (Lines 157-159)

```typescript
<h1>YOUR NAME</h1>
<p>Creative Developer / Designer</p>
```

### 2. Update About Section

**File**: `components/sections/About.tsx` (Lines 8-15)

```typescript
const skills = [
  'Your Skill 1',
  'Your Skill 2',
  'Your Skill 3',
  'Your Skill 4',
  'Your Skill 5',
  'Your Skill 6',
];
```

And update your bio (Lines 70-74).

### 3. Add Your Projects

**File**: `components/sections/Projects.tsx` (Lines 10-40)

```typescript
const projects = [
  {
    id: 1,
    title: 'Your Project',
    category: 'Category',
    description: 'Description',
    image: '/projects/project-1.jpg',
  },
  // Add more...
];
```

**File**: `app/projects/[id]/page.tsx` (Lines 11-48)

Add detailed project information matching the IDs above.

### 4. Update Contact Info

**File**: `components/sections/Contact.tsx` (Line 67)

```typescript
<a href="mailto:your@email.com">
  your@email.com
</a>
```

Update social links (Lines 76-105).

### 5. Update Navigation & Footer

**File**: `components/Navigation.tsx` (Lines 34, 56-58)
**File**: `components/Footer.tsx` (Line 8)

Update your name and email addresses.

## 📸 Add Images

1. Create folder: `public/projects/`
2. Add images: `project-1.jpg`, `project-2.jpg`, etc.
3. Reference in project data

## 🎨 Customize Appearance

### Colors
Edit `app/globals.css`:
```css
:root {
  --background: #0a0a0a;  /* Background */
  --foreground: #ededed;  /* Text */
}
```

### Fonts
The portfolio uses Geist Sans and Geist Mono by default.
To change, edit `app/layout.tsx`.

## 🏗️ Build for Production

```bash
npm run build
```

Test the production build:
```bash
npm start
```

## 🚢 Deploy

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or push to GitHub and deploy via [vercel.com](https://vercel.com).

## 📖 Need More Help?

- **Full Customization**: See `CUSTOMIZATION_GUIDE.md`
- **Deployment**: See `DEPLOYMENT.md`
- **General Info**: See `README.md`

## 🎉 You're Ready!

Your immersive portfolio is set up! Start customizing and make it your own.

## 🆘 Quick Troubleshooting

**Build fails?**
```bash
npm run build
```
Check for TypeScript errors and fix them.

**Animations not working?**
- Make sure you're on a desktop browser
- Check browser console for errors

**Images not showing?**
- Verify images are in `public/projects/`
- Check file names match exactly (case-sensitive)

**Need to start fresh?**
```bash
rm -rf node_modules package-lock.json
npm install
```

Happy building! 🚀
