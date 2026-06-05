# Complete Deployment Guide: Frontend on Vercel, Backend on Render

## Overview
- **Frontend**: Vercel (https://vercel.com)
- **Backend**: Render (https://render.com)
- **Repository**: https://github.com/AmohJoel65/FoodDelivery

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to [https://render.com](https://render.com)
2. Click "Sign Up" in the top right
3. Sign up with GitHub (recommended) or email
4. Verify your email if required

### Step 2: Prepare Backend for Deployment

1. **Create backend environment file:**
   - Navigate to `c:/Users/User/joel-app/backend`
   - Create a file named `.env` with these contents:
   ```env
   PORT=4000
   JWT_SECRET=your_secure_random_jwt_secret_here
   NODE_ENV=production
   ```

2. **Generate a secure JWT secret:**
   - Go to https://www.random.org/strings/?num=1&len=32&digits=on&upper=on&lower=on&unique=on&format=html
   - Copy the generated string
   - Replace `your_secure_random_jwt_secret_here` with this string in your `.env` file

3. **Update backend package.json (if needed):**
   - Ensure your `backend/package.json` has the correct start script:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

### Step 3: Deploy Backend on Render

1. **Go to Render Dashboard:**
   - After logging in, you'll be at the Render Dashboard
   - Click "New +" in the top right
   - Select "Web Service"

2. **Connect GitHub Repository:**
   - Click "Connect GitHub"
   - Authorize Render to access your GitHub account if prompted
   - Search for your repository: `FoodDelivery`
   - Click "Connect" next to it

3. **Configure Web Service:**

   **Basic Settings:**
   - **Name**: `joel-backend` (or any name you prefer)
   - **Region**: Choose the region closest to your users (e.g., Oregon, Frankfurt, Singapore)
   - **Branch**: `main`

   **Build & Deploy Settings:**
   - **Root Directory**: `backend` (important - this tells Render to look in the backend folder)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

   **Environment Variables:**
   Click "Add Environment Variable" and add:
   - `PORT`: `4000`
   - `JWT_SECRET`: (paste your secure JWT secret from step 2)
   - `NODE_ENV`: `production`

4. **Advanced Settings (Optional but Recommended):**
   - Click "Advanced" at the bottom
   - **Instance Type**: Leave as "Free" (or upgrade to "Standard" for better performance)
   - **RAM**: Leave default (512 MB for free tier)

5. **Deploy:**
   - Click "Create Web Service" at the bottom
   - Wait for the deployment to complete (2-5 minutes)
   - You'll see a live log showing the build process

6. **Get Your Backend URL:**
   - Once deployed, you'll see a URL like: `https://joel-backend.onrender.com`
   - Copy this URL - you'll need it for the frontend deployment

7. **Test the Backend:**
   - Open your browser and visit: `https://your-backend-url.onrender.com/api/health`
   - You should see: `{"success":true,"message":"Joel. Gastronomy API is live and healthy."}`
   - If you see this, your backend is successfully deployed!

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click "Sign Up" in the top right
3. Sign up with GitHub (recommended) or email
4. Verify your email if required

### Step 2: Prepare Frontend for Deployment

1. **Update frontend environment file:**
   - Navigate to `c:/Users/User/joel-app/frontend`
   - Open the `.env` file
   - Set the API URL to your Render backend URL:
   ```env
   VITE_API_URL=https://joel-backend.onrender.com
   ```
   - Replace `joel-backend.onrender.com` with your actual Render backend URL

2. **Commit and push the changes:**
   ```bash
   cd c:/Users/User/joel-app
   git add .
   git commit -m "Configure environment variables for production"
   git push
   ```

### Step 3: Deploy Frontend on Vercel

1. **Go to Vercel Dashboard:**
   - After logging in, you'll be at the Vercel Dashboard
   - Click "Add New Project" in the top right

2. **Import GitHub Repository:**
   - Click "Import" next to your `FoodDelivery` repository
   - Or search for it and click "Import"

3. **Configure Project:**

   **Framework Preset:**
   - Vercel should automatically detect "Vite"
   - If not, select "Vite" from the dropdown

   **Project Settings:**
   - **Project Name**: `joel-frontend` (or any name you prefer)
   - **Root Directory**: `frontend` (important - this tells Vercel to look in the frontend folder)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)

   **Environment Variables:**
   - Click "Environment Variables"
   - Click "Add New"
   - **Name**: `VITE_API_URL`
   - **Value**: `https://joel-backend.onrender.com` (your Render backend URL)
   - Click "Add"

4. **Deploy:**
   - Click "Deploy" at the bottom
   - Wait for the deployment to complete (1-3 minutes)
   - You'll see a live log showing the build process

5. **Get Your Frontend URL:**
   - Once deployed, you'll see a URL like: `https://joel-frontend.vercel.app`
   - This is your live frontend URL!

---

## Part 3: Configure Production Environment Variables

### Backend Environment Variables (Render)

If you need to add or update environment variables after deployment:

1. Go to Render Dashboard
2. Click on your web service (`joel-backend`)
3. Scroll down to "Environment Variables"
4. Click "Add Environment Variable"
5. Add the variable and click "Save Changes"
6. Render will automatically redeploy with the new variables

### Frontend Environment Variables (Vercel)

If you need to add or update environment variables after deployment:

1. Go to Vercel Dashboard
2. Click on your project (`joel-frontend`)
3. Go to "Settings" tab
4. Click "Environment Variables" in the left sidebar
5. Add or update variables
6. Click "Save"
7. Redeploy your project for changes to take effect

---

## Part 4: Test Your Production Deployment

### Test Backend

1. **Health Check:**
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Expected: `{"success":true,"message":"Joel. Gastronomy API is live and healthy."}`

2. **Get Food Items:**
   - Visit: `https://your-backend-url.onrender.com/api/food/list`
   - Expected: JSON array of food items

### Test Frontend

1. **Visit Your Frontend:**
   - Open: `https://your-frontend-url.vercel.app`
   - You should see the Joel. Artisan Food Delivery homepage

2. **Test Key Features:**
   - Browse food items
   - Add items to cart
   - Create a new account
   - Sign in with admin credentials:
     - Email: `joelamoh65@gmail.com`
     - Password: `admin123`
   - Access admin dashboard
   - Test adding/editing food items
   - Test placing an order

---

## Part 5: Troubleshooting

### Backend Issues

**Issue: Backend won't start**
- Check Render logs for error messages
- Ensure all environment variables are set correctly
- Verify the build command is `npm install` and start command is `npm start`

**Issue: Database not initializing**
- Render will create the `db.json` file on first deployment
- Check logs to see if database initialization succeeded
- The database will be seeded with default food items automatically

**Issue: Port conflicts**
- Render automatically assigns a port
- Ensure your backend code uses `process.env.PORT` (it should already)

### Frontend Issues

**Issue: Frontend can't connect to backend**
- Verify `VITE_API_URL` is set correctly in Vercel environment variables
- Check browser console for CORS errors
- Ensure backend is running and accessible

**Issue: Build fails**
- Check Vercel build logs for specific errors
- Ensure all dependencies are in `frontend/package.json`
- Verify the build command is `npm run build`

**Issue: Images not loading**
- Ensure backend uploads folder exists
- Check that image URLs are using the correct backend URL
- Verify backend is serving static files correctly

---

## Part 6: Maintenance

### Updating Your Application

**To update the application:**

1. Make changes to your code locally
2. Test locally: `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```
4. **Render**: Automatically detects changes and redeploys
5. **Vercel**: Automatically detects changes and redeploys

### Monitoring

**Render:**
- Go to your web service dashboard
- View logs, metrics, and deployment history
- Set up alerts for errors or downtime

**Vercel:**
- Go to your project dashboard
- View deployment logs, analytics, and performance metrics
- Set up notifications for failed deployments

---

## Part 7: Cost Summary

### Free Tier Limits

**Render (Free Tier):**
- 750 hours/month of compute time
- 512 MB RAM
- Shared CPU
- Automatic sleep after 15 minutes of inactivity
- Wakes up on first request (may take 30-60 seconds)

**Vercel (Hobby Tier - Free):**
- Unlimited deployments
- 100 GB bandwidth/month
- 6 GB serverless function execution
- Automatic SSL certificates
- Edge caching

### Paid Upgrades (Optional)

**Render Standard ($7/month):**
- No sleep (always on)
- 2 GB RAM
- Dedicated CPU
- Faster cold starts

**Vercel Pro ($20/month):**
- 1 TB bandwidth/month
- 100 GB serverless function execution
- Team collaboration features
- Advanced analytics

---

## Quick Reference URLs

After deployment, save these URLs:

- **Frontend URL**: `https://your-frontend.vercel.app`
- **Backend URL**: `https://your-backend.onrender.com`
- **Backend Health**: `https://your-backend.onrender.com/api/health`
- **Backend API**: `https://your-backend.onrender.com/api/food/list`
- **GitHub Repo**: `https://github.com/AmohJoel65/FoodDelivery`

---

## Support

If you encounter issues:

1. Check the logs on Render and Vercel
2. Review the troubleshooting section above
3. Ensure all environment variables are set correctly
4. Verify your code works locally before deploying

For additional help:
- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs
