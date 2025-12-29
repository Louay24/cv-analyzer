# Railway Quick Start (5 minutes)

## Step-by-Step:

1. **Push to GitHub** (if not already)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Go to [railway.app](https://railway.app)** and sign up

3. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub
   - Select your `cv-analyzer` repository

4. **Railway Auto-Detects Docker Compose**
   - Railway will automatically detect your `docker-compose.yml`
   - It will create 3 services: `postgres`, `backend`, `frontend`
   - **Important:** Railway does NOT automatically expose ports publicly
   - Services run internally and can communicate via service names
   - You must manually generate public URLs for services that need internet access

5. **Set Environment Variables**
   - Click on your project
   - Go to "Variables" tab
   - Add these variables (click "New Variable" for each):
   
   ```
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=<click-generate-or-type-strong-password>
   POSTGRES_DB=cv_analyzer
   DATABASE_URL=postgresql://postgres:<same-password-as-above>@postgres:5432/cv_analyzer
   ```

6. **Generate Public URLs (Only for Frontend & Backend)**
   - **Frontend:** Click on the `frontend` service → "Settings" tab → "Generate Domain" → Copy URL
   - **Backend:** Click on the `backend` service → "Settings" tab → "Generate Domain" → Copy URL
   - **PostgreSQL:** Do NOT generate a public URL for postgres (security risk - keep it internal)
   - Railway uses the first `EXPOSE` port from your Dockerfile, or port 3000/3001 by default
   - Services communicate internally using service names (e.g., `postgres:5432`)

7. **Update Environment Variables with URLs**
   - Go back to "Variables" tab
   - Add/Update:
   ```
   FRONTEND_URL=https://cv-analyzer-frontend.up.railway.app
   NEXT_PUBLIC_API_URL=https://cv-analyzer-backend.up.railway.app
   ```

8. **Add Any Missing API Keys**
   - If you use Mastra AI, Cloudinary, or other services, add their keys to the Variables tab

9. **Deploy**
   - Railway automatically deploys when you push to GitHub
   - Or click "Deploy" button manually
   - Wait for all services to show "Deployed" status

10. **Done!**
    - Your app is live at the frontend URL
    - Backend API is available at the backend URL

## How Railway Handles Ports:

- **Railway does NOT automatically expose all ports** from docker-compose
- Railway exposes ports based on:
  1. The first `EXPOSE` instruction in your Dockerfile
  2. Or the port you configure when generating a public domain
- **Internal communication:** Services use service names (e.g., `postgres:5432`, `backend:3001`)
- **Public access:** Only services with generated domains are accessible from the internet
- **Port mapping:** The `ports:` section in docker-compose is for local development; Railway handles routing automatically

## Troubleshooting:

- **Build fails?** Check the logs in each service's "Deployments" tab
- **Database connection error?** Make sure `DATABASE_URL` uses `postgres` as hostname (not `localhost`)
- **CORS errors?** Verify `FRONTEND_URL` matches your actual frontend domain
- **Services not starting?** Check that all environment variables are set correctly
- **Port not exposed?** Make sure you generated a public domain for that service in Settings
- **Can't access service?** Check that the service has a generated domain (not all services need public URLs)

## Cost:

- **Free:** $5 credit/month (usually enough for small apps)
- **After free credit:** Pay-as-you-go (very affordable, ~$5-10/month for small apps)

