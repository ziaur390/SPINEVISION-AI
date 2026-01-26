# Deployment & Maintenance Guide

## 🎉 Backend is Live!
Your backend is now successfully running on Render.

### 1. Get Your Backend URL
1. Go to your **Render Dashboard**.
2. Click on your `spinevision-api` web service.
3. Copy the URL from the top left (it looks like `https://spinevision-api.onrender.com`).
4. **Save this URL**, you will need it for the Frontend.

---

## 🚀 Deploying the Frontend (Vercel)

Now you need to connect your frontend to this live backend.

1. **Push your latest code** to GitHub (already done).
2. Go to [Vercel](https://vercel.com) and sign in.
3. Click **"Add New Project"**.
4. Import your `SPINEVISION-AI` repository.
5. In the "Configure Project" screen:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (Click "Edit" and select the `frontend` folder).
   - **Environment Variables**:
     - Key: `VITE_API_URL`
     - Value: `YOUR_RENDER_BACKEND_URL` (e.g., `https://spinevision-api.onrender.com`)
       * *Note: Do NOT add a trailing slash `/` at the end.*
6. Click **Deploy**.

---

## ⚡ How to Handle Free Tier Limitations

You are using the **Render Free Tier**. Here is what you need to know and how to manage it:

### 1. The "Sleep" Phenomenon (Cold Starts)
- **What happens:** If no one visits your site for 15 minutes, Render puts your backend to "sleep" to save resources.
- **The Consequence:** The *first* person to visit after a break will experience a **delay of 45-60 seconds** while the server "wakes up".
- **Is it broken?** No! It's just waking up.

### 2. How to Prevent "Sleeping" (Keep-Alive Strategy)
To ensure your app is always instant, you can use a free "uptime monitor" to ping your site every 10 minutes.

**Steps:**
1. Sign up for a free account at [UptimeRobot](https://uptimerobot.com/) or [Cron-job.org](https://cron-job.org/).
2. Create a new **Monitor**.
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: SpineVision WakeUp
   - **URL**: `https://YOUR-APP-NAME.onrender.com/health` (Use your backend URL + `/health`)
   - **Monitoring Interval**: 10 minutes (or 5 minutes)
3. Save it.
4. **Result:** This external service will "visit" your API every 10 minutes, tricking Render into thinking it's active, so it **never goes to sleep**.

### 3. Database Persistence
- You are using SQLite (`spinevision.db`).
- **Warning:** On the free tier, if Render restarts your instance (which happens occasionally for maintenance or new deploys), **disk files are reset**.
- **Current Status:** Your database will reset to empty on every deployment/restart.
- **Permanent Fix:** For a real production app, you should use an external database like **PostgreSQL** (Render offers a free tier for this too) or **ElephantSQL**.
  - *For this project/presentation:* It is usually acceptable for data to reset, but if you need persistent data, let me know and I can help you set up a free PostgreSQL database.

---

## 🛠️ Maintenance Tips
- **Logs:** Check Render "Logs" tab if something goes wrong.
- **Usage:** Free tier has a monthly bandwidth limit (usually plenty for a project).
- **Cost:** As long as you stay on the "Free" web service plan, it will **never expire** or charge you. It is free forever, not a trial.

