# Free Deployment Guide

This guide covers free deployment options for the CV Analyzer application using Docker Compose.

## Option 1: Railway (Recommended - Easiest)

Railway offers $5 free credit per month and supports Docker Compose natively.

### Steps:

1. **Sign up at [railway.app](https://railway.app)**

2. **Create a new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (connect your repo) OR "Empty Project"

3. **Deploy using Docker Compose:**
   - If using GitHub: Railway will auto-detect `docker-compose.yml`
   - If using Empty Project: Click "New" → "GitHub Repo" → Select your repo
   - Railway will automatically detect and use your `docker-compose.yml`

4. **Set Environment Variables:**
   - Go to your project → Variables tab
   - Add these variables:
     ```
     POSTGRES_USER=postgres
     POSTGRES_PASSWORD=<generate-strong-password>
     POSTGRES_DB=cv_analyzer
     DATABASE_URL=postgresql://postgres:<password>@postgres:5432/cv_analyzer
     FRONTEND_URL=https://your-app-name.up.railway.app
     NEXT_PUBLIC_API_URL=https://your-backend-name.up.railway.app
     ```

5. **Generate Public URLs:**
   - Go to each service (postgres, backend, frontend)
   - Click "Settings" → "Generate Domain" for frontend and backend
   - Update `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` with the generated URLs

6. **Deploy:**
   - Railway will automatically build and deploy when you push to your repo
   - Or click "Deploy" manually

**Note:** Railway gives $5 free credit/month. After that, you pay for usage (very affordable for small apps).

---

## Option 2: Render

Render offers a free tier with some limitations.

### Steps:

1. **Sign up at [render.com](https://render.com)**

2. **Create a new Blueprint:**
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will detect `docker-compose.yml`

3. **Configure Services:**
   - Render will create services from your docker-compose.yml
   - For each service, set environment variables in the dashboard

4. **Set Environment Variables:**
   ```
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=<generate-strong-password>
   POSTGRES_DB=cv_analyzer
   DATABASE_URL=postgresql://postgres:<password>@postgres:5432/cv_analyzer
   FRONTEND_URL=https://your-app.onrender.com
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```

5. **Limitations:**
   - Free tier services spin down after 15 minutes of inactivity
   - First request after spin-down takes ~30 seconds
   - PostgreSQL free tier has 90-day data retention limit

---

## Option 3: Fly.io

Fly.io offers a generous free tier but requires converting docker-compose to fly.toml.

### Steps:

1. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Sign up and login:**
   ```bash
   fly auth signup
   fly auth login
   ```

3. **Initialize Fly.io:**
   ```bash
   fly launch
   ```
   - This will create a `fly.toml` file
   - You'll need to configure it for your multi-service setup

4. **Deploy:**
   ```bash
   fly deploy
   ```

**Note:** Fly.io requires more configuration for multi-service apps. Consider this if you want more control.

---

## Option 4: DigitalOcean App Platform (Free Trial)

DigitalOcean offers a $200 free credit for new users (60 days).

### Steps:

1. **Sign up at [digitalocean.com](https://www.digitalocean.com)**

2. **Create App:**
   - Go to App Platform
   - Click "Create App"
   - Connect your GitHub repo

3. **Configure:**
   - DigitalOcean will detect your docker-compose.yml
   - Set environment variables in the dashboard

---

## Quick Start with Railway (Recommended)

1. Push your code to GitHub
2. Sign up at railway.app
3. Create new project → Connect GitHub repo
4. Railway auto-detects docker-compose.yml
5. Set environment variables
6. Generate public domains for frontend/backend
7. Done! Your app is live

**Estimated time:** 5-10 minutes

---

## Environment Variables Checklist

Make sure to set these in your deployment platform:

### Database:
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DATABASE_URL`

### Backend:
- `NODE_ENV=production`
- `PORT=3001`
- `DATABASE_URL`
- `FRONTEND_URL` (your frontend URL)
- Any API keys (Mastra AI, Cloudinary, etc.)

### Frontend:
- `NODE_ENV=production`
- `NEXT_PUBLIC_API_URL` (your backend URL)

---

## Troubleshooting

### Database connection issues:
- Ensure `DATABASE_URL` uses the correct service name (e.g., `postgres` in docker-compose)
- Check that the database service is healthy before backend starts

### CORS issues:
- Make sure `FRONTEND_URL` in backend matches your actual frontend URL
- Check that `NEXT_PUBLIC_API_URL` in frontend matches your backend URL

### Build failures:
- Check build logs in your platform's dashboard
- Ensure all environment variables are set
- Verify Dockerfile syntax

