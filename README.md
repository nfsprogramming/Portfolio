# Immersive Portfolio - ActiveTheory Inspired

A high-end, immersive personal portfolio inspired by ActiveTheory.net, featuring cutting-edge animations, WebGL effects, and a cinematic user experience.

## 🎨 Features

- **Dark, Minimal, Cinematic Design** - Premium feel with carefully crafted aesthetics
- **Smooth Scrolling** - Powered by Lenis for buttery smooth navigation
- **Advanced Animations** - GSAP and ScrollTrigger for complex, performant animations
- **WebGL Background** - Three.js powered 3D graphics in the hero section
- **Custom Cursor** - Interactive cursor with hover effects
- **Scroll-Based Storytelling** - Content reveals as you scroll
- **Responsive Design** - Optimized for all devices
- **Page Transitions** - Smooth transitions between pages
- **Project Case Studies** - Detailed project pages with rich content

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger
- **3D Graphics**: Three.js
- **Smooth Scroll**: Lenis
- **Fonts**: Geist Sans & Geist Mono

## 📦 Installation

```bash
npm install
```

## 🚀 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   └── projects/[id]/       # Dynamic project pages
├── components/
│   ├── sections/            # Page sections (Hero, About, Projects, Contact)
│   ├── CustomCursor.tsx     # Custom cursor component
│   ├── Navigation.tsx       # Navigation bar
│   └── SmoothScroll.tsx     # Smooth scroll provider
```

## 🎯 Customization

### Update Your Information

1. **Name & Title** - Edit `components/sections/Hero.tsx`
2. **About Section** - Edit `components/sections/About.tsx`
3. **Projects** - Edit the `projects` array in `components/sections/Projects.tsx`
4. **Contact Info** - Edit `components/sections/Contact.tsx`
5. **Navigation** - Edit `components/Navigation.tsx`

### Add Project Images

Place your project images in the `public/projects/` directory and update the image paths in the project data.

### Customize Colors

Update color scheme in `app/globals.css` and Tailwind config.

## 🎬 Animation Details

- **Hero Animation**: Title and subtitle fade in with stagger
- **Scroll Animations**: All sections animate on scroll using ScrollTrigger
- **Cursor Effects**: Custom cursor with magnetic effect on interactive elements
- **Project Hover**: Images scale and overlay appears on hover
- **Text Reveals**: Text animates in character by character

## 📱 Performance

- Lazy loading for images
- Optimized Three.js rendering
- GPU-accelerated animations with GSAP
- Mobile-friendly with reduced animations where appropriate

## 🚢 Deployment

Deploy to Vercel:

```bash
npm run build
```

Or connect your GitHub repo to Vercel for automatic deployments.

## 📝 License

MIT

## 🙏 Credits

Inspired by [ActiveTheory.net](https://activetheory.net)
