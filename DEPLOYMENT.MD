# Deployment Guide

This guide covers deploying both the Vue frontend and Sanity Studio.

## Prerequisites

- Node.js 18+
- Sanity CLI installed globally: `npm install -g @sanity/cli`
- Git repository (recommended)

---

## 1. Deploy Sanity Studio

### Option A: Deploy to Sanity (Recommended)

```bash
cd studio-fortu
npm install
npx sanity deploy
```

You'll be prompted to choose a hostname (e.g., `fortu`).
Your studio will be available at `https://fortu.sanity.studio`.

### Option B: Self-host on Vercel/Netlify

```bash
cd studio-fortu
npm run build
```

Deploy the `dist` folder to your hosting platform.

---

## 2. Configure CORS

Go to [sanity.io/manage](https://sanity.io/manage) > Your Project > API > CORS Origins.

Add these origins:
- `http://localhost:5173` (local development)
- `https://your-production-domain.com` (production)
- `https://your-app.vercel.app` (if using Vercel)

Enable "Allow credentials" for each.

---

## 3. Deploy Frontend (Vue App)

### Environment Variables

Create a `.env` file locally (already gitignored):

```
VITE_SANITY_PROJECT_ID=mb1o2t9p
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
```

### Build for Production

```bash
npm install
npm run build
```

Output will be in the `dist` folder.

### Deploy to Vercel

1. Push code to GitHub/GitLab
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard:
   - `VITE_SANITY_PROJECT_ID` = `mb1o2t9p`
   - `VITE_SANITY_DATASET` = `production`
   - `VITE_SANITY_API_VERSION` = `2024-01-01`
4. Deploy

### Deploy to Netlify

1. Push code to GitHub/GitLab
2. Import project at [app.netlify.com](https://app.netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Site settings > Environment variables
5. Deploy

For SPA routing, create `public/_redirects`:
```
/*    /index.html   200
```

---

## 4. Redeploying After Changes

### Frontend Changes

If using Vercel/Netlify with Git integration:
```bash
git add .
git commit -m "your changes"
git push
```
Auto-deploys on push.

Manual deploy:
```bash
npm run build
# Upload dist folder or trigger deploy in dashboard
```

### Sanity Studio Changes (schema, config)

```bash
cd studio-fortu
npx sanity deploy
```

### Content Changes

No redeployment needed. Content updates in Sanity Studio appear automatically on the frontend (uses CDN with fast propagation).

---

## 5. Post-Deployment Checklist

- [ ] Sanity Studio deployed and accessible
- [ ] CORS origins configured for production domain
- [ ] Environment variables set in hosting platform
- [ ] Test all pages load correctly
- [ ] Test Sanity content appears on frontend
- [ ] Test 404 page works for invalid routes

---

## Quick Reference

| Service | URL |
|---------|-----|
| Sanity Manage | https://sanity.io/manage |
| Sanity Studio | https://fortu.sanity.studio (after deploy) |
| Project ID | mb1o2t9p |
| Dataset | production |

