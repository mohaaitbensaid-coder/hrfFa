# HRFA.MA Deployment Guide

This guide provides instructions for deploying the HRFA.MA platform to production.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas account created (or production MongoDB server ready)
- [ ] Strong JWT secret generated
- [ ] Environment variables configured
- [ ] Frontend built and tested
- [ ] Backend tested with production database
- [ ] Domain name registered (optional)
- [ ] SSL certificate ready (handled by hosting platforms)

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free tier cluster

2. **Configure Database Access**
   - Go to "Database Access"
   - Create a database user with username and password
   - Save credentials securely

3. **Configure Network Access**
   - Go to "Network Access"
   - Add IP address: `0.0.0.0/0` (allow from anywhere)
   - Or add specific IP addresses of your deployment servers

4. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/hrfa-ma`

## 🚀 Backend Deployment

### Option 1: Railway

1. **Install Railway CLI** (optional)
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy via GitHub**
   - Push code to GitHub
   - Go to [Railway.app](https://railway.app)
   - Create new project → Deploy from GitHub
   - Select your repository and the `backend` directory

3. **Configure Environment Variables**
   ```env
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hrfa-ma
   JWT_SECRET=your-very-secure-random-string-change-this
   JWT_EXPIRE=7d
   CLIENT_URL=https://your-frontend-domain.com
   ```

4. **Deploy**
   - Railway will automatically deploy
   - Get your backend URL: `https://your-app.railway.app`

### Option 2: Render

1. **Create Account**
   - Go to [Render.com](https://render.com)

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: hrfa-backend
     - **Root Directory**: backend
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`

3. **Add Environment Variables**
   - Same as Railway configuration above

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   cd backend
   heroku login
   heroku create hrfa-backend
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set CLIENT_URL="https://your-frontend.com"
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Dashboard**
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: frontend
     - **Build Command**: `npm run build`
     - **Output Directory**: dist

3. **Environment Variables**
   ```env
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-app.vercel.app`

### Option 2: Netlify

1. **Create Account**
   - Go to [Netlify.com](https://netlify.com)

2. **New Site from Git**
   - Connect GitHub repository
   - Configure:
     - **Base directory**: frontend
     - **Build command**: `npm run build`
     - **Publish directory**: frontend/dist

3. **Environment Variables**
   ```env
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```

4. **Deploy**
   - Click "Deploy site"

## 🔐 Security Considerations

### 1. Generate Strong JWT Secret
```bash
# Generate a random 64-character string
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 2. Update CORS Settings
In `backend/server.js`, update CORS to your production domain:
```javascript
app.use(cors({
    origin: process.env.CLIENT_URL || 'https://your-production-domain.com',
    credentials: true
}));
```

### 3. Enable Rate Limiting (Optional)
```bash
cd backend
npm install express-rate-limit
```

Add to `server.js`:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 📱 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

## 🔍 Post-Deployment Testing

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.com/api/health
   ```
   Expected: `{"status":"ok","message":"HRFA.MA API is running"}`

2. **Frontend Test**
   - Visit your frontend URL
   - Test language switching (AR/EN)
   - Test RTL/LTR layout
   - Test registration and login
   - Test artisan search

3. **Database Connection**
   - Check logs for "Connected to MongoDB"
   - Register a test user
   - Verify data in MongoDB Atlas

## 🐛 Troubleshooting

### Backend Issues

1. **Database Connection Fails**
   - Verify MongoDB URI is correct
   - Check network access settings in MongoDB Atlas
   - Ensure username/password are URL-encoded

2. **CORS Errors**
   - Verify CLIENT_URL matches frontend domain
   - Check CORS configuration in server.js

3. **JWT Errors**
   - Ensure JWT_SECRET is set and secure
   - Check token expiration settings

### Frontend Issues

1. **API Calls Failing**
   - Verify VITE_API_URL is correct
   - Check browser console for errors
   - Ensure backend is running

2. **Build Fails**
   - Clear node_modules and reinstall
   - Check for TypeScript/linting errors

## 📊 Monitoring

1. **Backend Logs**
   - Railway: Dashboard → Logs
   - Render: Dashboard → Logs
   - Heroku: `heroku logs --tail`

2. **Database Monitoring**
   - MongoDB Atlas Dashboard
   - Monitor connections and queries

3. **Frontend Analytics** (Optional)
   - Add Google Analytics
   - Add Sentry for error tracking

## 🔄 Continuous Deployment

Both Vercel and Railway/Render support automatic deployments:
- Push to GitHub main branch
- Platform automatically rebuilds and deploys
- Zero-downtime deployments

## 📝 Environment Variables Summary

### Backend
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<64-char-random-string>
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 🎯 Next Steps After Deployment

1. Create admin account in database
2. Test all user flows
3. Set up monitoring and alerts
4. Configure backups for MongoDB
5. Set up CI/CD pipeline (optional)
6. Add SSL certificate (automatic on Vercel/Netlify/Railway)
7. Consider CDN for static assets
8. Implement caching strategies

## 📧 Support

For deployment issues, check:
- Platform-specific documentation
- GitHub issues
- MongoDB Atlas support

---

**🎉 Congratulations!** Your HRFA.MA platform is now live in production!
