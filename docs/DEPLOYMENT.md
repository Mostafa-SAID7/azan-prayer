# 🚀 Deployment Guide

Deploy Payer to production.

## Deployment Options

| Platform | Effort | Cost | Recommendation |
|----------|--------|------|-----------------|
| **Vercel** | Easy | Free | ⭐ Recommended |
| **Netlify** | Easy | Free | Good alternative |
| **GitHub Pages** | Medium | Free | Static only |
| **AWS** | Hard | Paid | Enterprise |
| **Docker** | Medium | Varies | Self-hosted |

## Vercel (Recommended) ⭐

### Prerequisites

- GitHub account
- Vercel account (sign up with GitHub)
- Repository pushed to GitHub

### Step-by-Step

#### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select GitHub
4. Authorize Vercel with GitHub
5. Select the `payer` repository

#### 2. Configure Project

Vercel detects it's a Vite project automatically:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Environment variables (add in Vercel dashboard):

```
VITE_ALADHAN_API_URL=https://api.aladhan.com/v1
VITE_DEFAULT_CITY=Cairo
VITE_DEFAULT_COUNTRY=Egypt
```

#### 3. Deploy

Click "Deploy" button. Vercel will:

- Clone repository
- Install dependencies
- Run `npm run build`
- Deploy to CDN
- Generate URL (e.g., `payer.vercel.app`)

#### 4. Custom Domain (Optional)

1. Go to project settings
2. Click "Domains"
3. Add custom domain
4. Follow DNS configuration

### Automatic Deployments

Every push to `main` branch automatically redeploys:

```bash
# Deploy happens automatically
git push origin main
```

### Preview Deployments

Every pull request gets a preview URL:

```
https://payer-pr-123.vercel.app
```

Perfect for testing before merging!

## GitHub Pages

### Prerequisites

- Repository on GitHub
- Public repository

### Step-by-Step

#### 1. Create Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### 2. Update vite.config.js

```javascript
export default {
  base: '/payer/',  // Match repository name
  // ... other config
}
```

#### 3. Enable Pages

1. Go to repository settings
2. Scroll to "GitHub Pages"
3. Select "gh-pages" branch
4. Save

App deploys to: `https://yourusername.github.io/payer/`

## Netlify

### Prerequisites

- GitHub account connected to Netlify

### Step-by-Step

#### 1. Import Site

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Select "Import an existing project"
4. Choose GitHub
5. Select `payer` repository

#### 2. Configure Build

```
Build command: npm run build
Publish directory: dist
```

#### 3. Environment Variables

Add in Netlify dashboard:

```
VITE_ALADHAN_API_URL=https://api.aladhan.com/v1
```

#### 4. Deploy

Click "Deploy". Netlify handles the rest!

## Docker Deployment

To build and run the application as a Docker container, we use a secure multi-stage build configuration.

For the complete definition, refer directly to the root **[Dockerfile](../Dockerfile)**.

### Build & Run Locally

```bash
# Build image
docker build -t payer:latest .

# Run container
docker run -p 3000:8080 payer:latest
```

### Deploy to Docker Hub

```bash
# Tag image
docker tag payer:latest yourusername/payer:latest

# Push to Docker Hub
docker push yourusername/payer:latest
```

## Production Optimization

### Build Optimization

```bash
# Create optimized build
npm run build

# Check bundle size
npm install -g serve
serve -s dist
```

Expected sizes:

- JavaScript: ~200KB (gzipped)
- CSS: ~50KB (gzipped)
- Total: ~250KB

### Environment Variables

Production `.env.production`:

```env
VITE_ALADHAN_API_URL=https://api.aladhan.com/v1
VITE_DEBUG=false
VITE_ENABLE_PWA=true
```

### Performance Checklist

- [ ] Build completes without warnings
- [ ] Bundle size < 500KB gzipped
- [ ] All images optimized
- [ ] Service worker working offline
- [ ] PWA installable
- [ ] Dark mode working
- [ ] All languages working
- [ ] No console errors

## Pre-Deployment Testing

### Local Preview

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173`

Test:

- [ ] All prayer times display
- [ ] Dark mode works
- [ ] Language switcher works
- [ ] RTL layout correct
- [ ] Responsive on mobile
- [ ] Offline mode works
- [ ] Notifications work
- [ ] No console errors

### Production Testing Checklist

- [ ] Build successful
- [ ] All assets load
- [ ] No 404 errors
- [ ] Performance acceptable
- [ ] SEO tags present
- [ ] Mobile friendly
- [ ] Security headers set
- [ ] Analytics configured

## Monitoring

### Vercel Monitoring

- Dashboard shows real-time metrics
- Performance insights
- Error tracking
- Analytics

### Error Tracking

Optional: Add error tracking service

```bash
npm install @sentry/react
```

Initialize in `main.jsx`:

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

## Troubleshooting Deployments

### Build Fails

```bash
# Check for errors locally
npm run build

# Check logs on hosting platform
# Usually accessible from dashboard
```

### Wrong Environment Variables

```bash
# Verify in hosting dashboard:
# - VITE_ALADHAN_API_URL set correctly
# - All required vars present
# - No typos in names
```

### 404 on Custom Domain

```bash
# Check DNS records point to hosting
# Wait 24 hours for propagation
# Verify domain in hosting dashboard
```

### Slow Performance

- Check bundle size with `npm run build`
- Enable compression on server
- Add CDN caching headers
- Optimize images

## Rollback

### Vercel

1. Go to deployments
2. Click "Rollback" on previous deployment
3. Confirm

### GitHub Pages

```bash
# Revert commit
git revert <commit-hash>
git push origin main
```

## Health Checks

### Monthly

- [ ] Test all prayer times display correctly
- [ ] Check dark mode works
- [ ] Test on different devices
- [ ] Review error logs
- [ ] Check performance metrics

### Quarterly

- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] User feedback review

---

**Deployed successfully!** 🎉

[⬆ Back to Top](#-deployment-guide)
