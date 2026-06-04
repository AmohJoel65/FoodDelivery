# Vercel Deployment Guide for Joel. Artisan Food Delivery

## Important: Backend Database Issue

Your application uses a **file-based database** (`backend/data/db.json`). This will **NOT work** on Vercel serverless functions because:
- File system is ephemeral (files are deleted after each function execution)
- Data won't persist between deployments
- Each serverless function invocation is stateless

## Two Deployment Options

### Option 1: Frontend on Vercel, Backend on Render/Railway (Recommended)

**Pros:**
- Easier to set up
- File-based database works perfectly
- Reliable and cost-effective
- Frontend gets Vercel's performance benefits

**Cons:**
- Two separate hosting platforms
- Slightly more complex setup

---

### Option 2: Full Vercel Deployment (Advanced)

**Pros:**
- Everything on one platform
- Unified deployment

**Cons:**
- Requires converting file-based database to cloud database (Vercel Postgres/MongoDB)
- Requires significant backend refactoring
- File uploads need different solution (Vercel Blob)
- More complex and time-consuming

---

## Option 1: Step-by-Step Deployment (Recommended)

### Step 1: Deploy Backend to Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Prepare backend for deployment:**
   - Create a file: `backend/.env`
   ```env
   PORT=4000
   JWT_SECRET=your_secure_jwt_secret_here
   ```

3. **Create `backend/Dockerfile`** (if not exists):
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 4000
   CMD ["npm", "start"]
   ```

4. **Push code to GitHub** (if not already)

5. **Deploy on Render:**
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Select `backend` folder as Root Directory
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables:
     - `PORT`: 4000
     - `JWT_SECRET`: (generate a secure random string)
   - Click Deploy Web Service

6. **Copy your Render backend URL** (e.g., `https://your-backend.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Configure frontend environment:**
   - Edit `frontend/.env`:
   ```env
   VITE_API_URL=https://your-backend.onrender.com
   ```
   - Replace with your actual Render backend URL

3. **Push code to GitHub** (if not already)

4. **Deploy on Vercel:**
   - Go to Vercel Dashboard → Add New Project
   - Import your GitHub repository
   - Set Root Directory to `frontend`
   - Framework Preset: Vite
   - Add Environment Variable:
     - `VITE_API_URL`: `https://your-backend.onrender.com` (your Render URL)
   - Click Deploy

5. **Your frontend will be live** at `https://your-project.vercel.app`

### Step 3: Test the Deployment

1. Visit your Vercel frontend URL
2. Try:
   - Browsing food items
   - Adding items to cart
   - Creating an account
   - Placing an order
   - Admin login (email: `joelamoh65@gmail.com`, password: `admin123`)

---

## Option 2: Full Vercel Deployment (Advanced)

This requires significant refactoring. Here's what needs to be done:

### Required Changes:

1. **Replace file-based database with Vercel Postgres:**
   - Install `@vercel/postgres` package
   - Create database schema (users, foods, orders tables)
   - Migrate data from db.json to Postgres
   - Update all database operations in controllers

2. **Handle file uploads with Vercel Blob:**
   - Install `@vercel/blob` package
   - Replace multer with Vercel Blob upload
   - Update image serving logic

3. **Convert Express to Vercel Serverless Functions:**
   - Restructure backend as API routes in `api/` folder
   - Each route becomes a serverless function
   - Update middleware for serverless compatibility

4. **Update frontend API calls:**
   - Remove proxy configuration
   - Use relative paths for API calls

### Estimated Time: 8-12 hours of development

---

## Current Project Status for Vercel

✅ **Frontend - Ready for Vercel:**
- `frontend/vercel.json` created
- `frontend/.env.example` created
- `frontend/.env` created
- StoreContext updated to use `VITE_API_URL` environment variable
- Build command configured

❌ **Backend - NOT Ready for Vercel:**
- Uses file-based database (incompatible with serverless)
- Uses multer for file uploads (incompatible with serverless)
- Needs database migration to cloud database
- Needs restructuring for serverless functions

---

## Recommendation

**Use Option 1** (Frontend on Vercel, Backend on Render) because:
- Your current backend architecture works perfectly on Render
- No code changes required
- Faster deployment (30 minutes vs 8-12 hours)
- More reliable for your current setup
- Cost-effective (both have free tiers)

---

## Quick Start Commands

```bash
# For local development (current setup)
npm run dev

# For production build
cd frontend
npm run build
npm run preview
```

---

## Environment Variables Reference

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
```

### Backend (.env)
```env
PORT=4000
JWT_SECRET=your_secure_jwt_secret_here
```

---

## Support

If you need help with Option 2 (full Vercel deployment), I can guide you through:
1. Setting up Vercel Postgres
2. Migrating your database schema
3. Converting backend to serverless functions
4. Handling file uploads with Vercel Blob
