# Customization Guide

This guide will help you personalize your immersive portfolio.

## 🎯 Quick Start Customization

### 1. Personal Information

#### Hero Section
Edit `components/sections/Hero.tsx`:

```typescript
// Line 157-159: Update your name and title
<h1>YOUR NAME</h1>
<p>Creative Developer / Designer</p>
```

#### Navigation
Edit `components/Navigation.tsx`:

```typescript
// Line 34: Update portfolio name/logo
<Link href="/">Portfolio</Link>

// Line 56-58: Update email
<a href="mailto:hello@example.com">Get in Touch</a>
```

#### Footer
Edit `components/Footer.tsx`:

```typescript
// Line 8: Update name
<p>© {currentYear} Your Name. All rights reserved.</p>
```

### 2. About Section

Edit `components/sections/About.tsx`:

```typescript
// Lines 8-15: Update skills
const skills = [
  'Your Skill 1',
  'Your Skill 2',
  'Your Skill 3',
  'Your Skill 4',
  'Your Skill 5',
  'Your Skill 6',
];

// Lines 70-74: Update description
<p>
  Your personal description here...
</p>
```

### 3. Projects

#### Project List
Edit `components/sections/Projects.tsx`:

```typescript
// Lines 10-40: Update project data
const projects = [
  {
    id: 1, // Keep this for routing
    title: 'Your Project Title',
    category: 'Your Category',
    description: 'Your description',
    image: '/projects/project-1.jpg', // Add your image
  },
  // Add more projects...
];
```

#### Project Details
Edit `app/projects/[id]/page.tsx`:

```typescript
// Lines 11-48: Update project details
const projectsData = {
  '1': {
    title: 'Your Project',
    category: 'Category',
    description: 'Full description',
    problem: 'Problem statement',
    solution: 'Your solution',
    result: 'Results achieved',
    tools: ['Tool 1', 'Tool 2', 'Tool 3'],
  },
  // Match IDs with projects list
};
```

### 4. Contact Information

Edit `components/sections/Contact.tsx`:

```typescript
// Line 67: Update email
<a href="mailto:hello@example.com">
  hello@example.com
</a>

// Lines 76-105: Update social links
<a href="https://twitter.com/yourhandle">Twitter</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://instagram.com/yourhandle">Instagram</a>
```

### 5. Metadata (SEO)

Edit `app/layout.tsx`:

```typescript
// Lines 18-21
export const metadata: Metadata = {
  title: "Your Name - Creative Portfolio",
  description: "Your custom description for SEO",
};
```

## 🎨 Visual Customization

### Colors

Edit `app/globals.css`:

```css
:root {
  --background: #0a0a0a;  /* Change background color */
  --foreground: #ededed;  /* Change text color */
}
```

For more color changes, use Tailwind classes in components:
- `bg-black` → `bg-your-color`
- `text-white` → `text-your-color`
- `border-gray-800` → `border-your-color`

### Fonts

Edit `app/layout.tsx` to change fonts:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

Then update the CSS variables in `globals.css`.

### Animation Speed

Edit individual component files:

```typescript
// Change duration values in GSAP animations
gsap.to(element, {
  duration: 1.2, // Change this value
  // ...
});
```

### Custom Cursor

Edit `components/CustomCursor.tsx` to change cursor size/style:

```typescript
// Lines 16-18: Adjust cursor position offset
x: e.clientX - 5,  // Change offset
y: e.clientY - 5,

// Lines 22-24: Adjust animation duration
duration: 0.3,  // Change speed
```

Or modify in `app/globals.css`:

```css
.cursor-dot {
  width: 10px;    /* Change size */
  height: 10px;
  background: #ffffff;  /* Change color */
}
```

### Three.js Background

Edit `components/sections/Hero.tsx`:

```typescript
// Line 32: Change geometry
const geometry = new THREE.IcosahedronGeometry(1, 1);

// Line 34: Change material color
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,  // Change color
  wireframe: true,  // Toggle wireframe
});

// Line 44: Change particle count
const particlesCount = 500;  // More = more particles

// Line 123: Adjust background opacity
style={{ opacity: 0.3 }}  // 0.0 to 1.0
```

## 📸 Adding Images

### Project Images

1. Create directory: `public/projects/`
2. Add images: `project-1.jpg`, `project-2.jpg`, etc.
3. Update paths in `components/sections/Projects.tsx`

### Optimizing Images

Use Next.js Image component for better performance:

```typescript
import Image from 'next/image';

<Image 
  src="/projects/project-1.jpg"
  alt="Project name"
  width={1920}
  height={1080}
  priority
/>
```

## 🔧 Advanced Customization

### Adding New Sections

1. Create component in `components/sections/`
2. Import in `app/page.tsx`
3. Add scroll trigger animations following existing patterns

### Smooth Scroll Settings

Edit `components/SmoothScroll.tsx`:

```typescript
const lenis = new Lenis({
  duration: 1.2,          // Scroll duration
  easing: (t) => ...,     // Easing function
  wheelMultiplier: 1,     // Mouse wheel sensitivity
  touchMultiplier: 2,     // Touch sensitivity
});
```

### Mobile Responsiveness

The portfolio is already responsive, but you can adjust breakpoints:

- `md:` - Tablets and up (768px)
- `lg:` - Desktop (1024px)
- `xl:` - Large desktop (1280px)

Example:
```typescript
<h1 className="text-5xl md:text-7xl lg:text-9xl">
```

## 🚀 Performance Optimization

### Reducing Animations on Mobile

Wrap animations in media queries:

```typescript
useEffect(() => {
  if (window.innerWidth < 768) return; // Skip on mobile
  
  // Your animation code
}, []);
```

### Lazy Loading

Components are already optimized, but for images:

```typescript
<Image loading="lazy" ... />
```

### Reducing Three.js Load

```typescript
// Reduce particle count
const particlesCount = 200; // Instead of 500

// Lower pixel ratio
renderer.setPixelRatio(1); // Instead of window.devicePixelRatio
```

## 📝 Content Tips

### Project Descriptions
- Keep titles under 30 characters
- Categories should be 2-3 words
- Descriptions: 1-2 sentences
- Problem/Solution/Result: 2-3 sentences each

### About Section
- Keep personal bio under 50 words
- Choose 4-6 key skills
- Focus on what makes you unique

### Writing Style
- Use active voice
- Be concise and impactful
- Show results with numbers when possible

## 🎬 Animation Guidelines

- **Hero**: 1-1.5s entrance
- **Scroll reveals**: 0.8-1.2s
- **Hover effects**: 0.3-0.5s
- **Page transitions**: 0.6-1s

Keep animations smooth and purposeful. Don't overdo it!

## 🐛 Common Issues

### Animations not working
- Check if GSAP is imported
- Verify ScrollTrigger is registered
- Check element refs are not null

### Smooth scroll issues
- Ensure Lenis is properly initialized
- Check for CSS `overflow: hidden` conflicts

### Build errors
```bash
npm run build
```
Fix any TypeScript errors before deployment.

## 💡 Pro Tips

1. Test on actual devices, not just browser resize
2. Use your browser's DevTools to check performance
3. Keep file sizes small (images under 500KB)
4. Test with slow 3G to ensure good experience
5. Get feedback from friends/colleagues

## 🎉 You're Ready!

Once customized, build and deploy:

```bash
npm run build
```

Then deploy to Vercel, Netlify, or your preferred host.

Enjoy your new immersive portfolio! 🚀
