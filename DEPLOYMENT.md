# Deployment Guide

This guide will help you deploy your immersive portfolio to various hosting platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel is built by the creators of Next.js and offers the best performance and developer experience.

### Method 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Method 2: Deploy via GitHub

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure (Vercel auto-detects Next.js):
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click "Deploy"

Your site will be live in ~1 minute!

### Custom Domain on Vercel

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records at your domain registrar
5. SSL certificate will be automatically provisioned

## 🌐 Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Login:
```bash
netlify login
```

4. Deploy:
```bash
netlify deploy
```

5. For production:
```bash
netlify deploy --prod
```

### Via Netlify Dashboard

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import existing project"
4. Connect to GitHub
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

## ☁️ Deploy to Other Platforms

### AWS Amplify

```bash
npm install -g @aws-amplify/cli
amplify configure
amplify init
amplify add hosting
amplify publish
```

### Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Connect GitHub repository
4. Railway auto-detects Next.js
5. Click "Deploy"

### DigitalOcean App Platform

1. Push to GitHub
2. Go to DigitalOcean App Platform
3. Create new app
4. Select your repository
5. Configure:
   - Build Command: `npm run build`
   - Run Command: `npm start`
6. Deploy

## 🐳 Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 🔧 Pre-Deployment Checklist

- [ ] Update all placeholder content (name, email, socials)
- [ ] Add real project images to `public/projects/`
- [ ] Update metadata in `app/layout.tsx`
- [ ] Test build locally: `npm run build`
- [ ] Test production build: `npm run start`
- [ ] Check for console errors
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check page load performance
- [ ] Update README with your information
- [ ] Add custom domain (optional)

## 🎯 Performance Optimization

### Before Deploy

1. **Optimize Images**:
   - Use WebP format
   - Compress images (use tools like TinyPNG)
   - Keep images under 500KB

2. **Check Bundle Size**:
```bash
npm run build
```
Look for large dependencies you can optimize.

3. **Enable Image Optimization**:
Next.js automatically optimizes images in production.

### After Deploy

1. **Check Lighthouse Score**:
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit
   - Aim for 90+ in all categories

2. **Monitor Performance**:
   - Vercel Analytics (built-in)
   - Google Analytics
   - Cloudflare Web Analytics

## 🌍 Environment Variables

If you need environment variables (API keys, etc.):

### Local Development

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=your_value
```

### Production

#### Vercel:
1. Go to Project Settings
2. Navigate to "Environment Variables"
3. Add your variables

#### Netlify:
1. Go to Site Settings
2. Navigate to "Environment Variables"
3. Add your variables

## 🔒 Security

### Best Practices

1. **Never commit secrets**:
   - API keys
   - Private tokens
   - Database credentials

2. **Use environment variables** for sensitive data

3. **Enable HTTPS** (automatic on Vercel/Netlify)

4. **Add security headers** (already configured in Next.js)

## 📊 Analytics Setup

### Google Analytics

1. Create GA4 property
2. Get Measurement ID
3. Add to `app/layout.tsx`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `}
</Script>
```

### Vercel Analytics

Already included! Just enable in Vercel dashboard.

## 🔄 Continuous Deployment

### Automatic Deployments

When using Vercel/Netlify with GitHub:

1. Every push to `main` branch auto-deploys to production
2. Pull requests get preview deployments
3. Automatic rollbacks if build fails

### Branch Deployments

- `main` → Production
- `develop` → Staging
- Feature branches → Preview deployments

## 🐛 Troubleshooting

### Build Fails

1. Check build logs for errors
2. Run `npm run build` locally to reproduce
3. Fix TypeScript errors
4. Verify all imports are correct

### Site Not Loading

1. Check build output directory (should be `.next`)
2. Verify Node.js version (should be 18+)
3. Check for missing dependencies

### Images Not Showing

1. Verify images are in `public/` directory
2. Check file paths (case-sensitive)
3. Ensure images are committed to Git

### Performance Issues

1. Check Lighthouse score
2. Optimize large images
3. Reduce animation complexity on mobile
4. Enable caching headers

## 📱 Mobile Testing

Before deploying, test on:
- iPhone (Safari)
- Android (Chrome)
- iPad
- Various screen sizes

Tools:
- Chrome DevTools device emulation
- [BrowserStack](https://browserstack.com)
- Real devices

## 🎉 Post-Deployment

### Share Your Portfolio

1. Update LinkedIn with portfolio link
2. Add to GitHub profile README
3. Include in email signature
4. Share on social media
5. Add to portfolio sites (Dribbble, Behance)

### Maintenance

- Update projects regularly
- Keep dependencies updated: `npm update`
- Monitor performance
- Fix bugs as they arise
- Add new features based on feedback

## 📈 SEO Optimization

1. **Sitemap**: Next.js auto-generates at `/sitemap.xml`
2. **Meta Tags**: Already configured in layout
3. **Open Graph**: Add to `app/layout.tsx`:

```typescript
export const metadata = {
  openGraph: {
    title: 'Your Name - Portfolio',
    description: 'Your description',
    url: 'https://yoursite.com',
    siteName: 'Your Name',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Portfolio',
    description: 'Your description',
    images: ['/og-image.jpg'],
  },
};
```

4. **robots.txt**: Create `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml
```

## 🚀 You're Live!

Congratulations! Your portfolio is now live on the internet.

**Next Steps**:
1. Share with friends for feedback
2. Apply to jobs/clients
3. Keep building and adding projects
4. Monitor analytics
5. Iterate and improve

Need help? Check the main README or open an issue on GitHub.

Good luck! 🎉
