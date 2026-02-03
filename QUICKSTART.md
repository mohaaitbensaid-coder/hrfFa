# HRFA.MA - Quick Start Guide

Get the HRFA.MA platform up and running in minutes!

## ⚡ Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
cd automation
npm run install:all
```
Wait for all dependencies to install (~2-3 minutes).

### Step 2: Start MongoDB
Make sure MongoDB is running on your system.

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### Step 3: Start the Application
```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### Step 4: Open Your Browser
Visit: **http://localhost:5173**

## 🎯 First Steps

### 1. Create Your Account
- Click "إنشاء حساب" (Register) in the top right
- Choose your role:
  - **عميل (Client)**: To find and hire artisans
  - **حرفي (Artisan)**: To offer your services

### 2. For Artisans
Fill in your profile:
- **المهنة (Profession)**: Carpenter, Painter, Plumber, etc.
- **المدينة (City)**: Your city
- **Bio**: Describe your skills and experience
- **Experience**: Years of experience
- **Hourly Rate**: Your rate in MAD

### 3. For Clients
- Use the search bar to find artisans
- Filter by profession and city
- View artisan profiles
- Contact artisans via WhatsApp or phone

### 4. Explore Features
- **Search**: Find artisans by profession and location
- **Profile**: View detailed artisan profiles with ratings
- **Reviews**: Read client reviews and ratings
- **Language**: Switch between Arabic (AR) and English (EN)
- **Dashboard**: Manage your profile (after login)

## 🔄 Language & Direction

**Switch Language:**
- Click the language switcher in the header
- Choose: العربية (AR) or English (EN)
- The entire UI will update, including layout direction

**RTL Support:**
- Arabic mode uses RTL (Right-to-Left) layout
- English mode uses LTR (Left-to-Right) layout

## 📱 Test Data

Want to test without creating accounts? Here's how to create test data:

### Create Test Artisan
1. Register as an artisan
2. Fill in test data:
   - Name: محمد النجار
   - Phone: 0612345678
   - Profession: Carpenter
   - City: Casablanca
   - Bio: نجار محترف مع 10 سنوات خبرة

### Create Test Client
1. Register as a client
2. Fill in basic info
3. Search for artisans and leave reviews

## 🛠️ Development Tools

### Backend API Testing
```bash
# Health check
curl http://localhost:5000/api/health

# Get all artisans
curl http://localhost:5000/api/artisans
```

### View Database
Use MongoDB Compass:
- Connection String: `mongodb://localhost:27017`
- Database: `hrfa-ma`
- Collections: `users`, `reviews`

## 🐛 Common Issues

### Port Already in Use
**Frontend (5173):**
```bash
# Kill process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Backend (5000):**
```bash
# Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Not Running
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### "Module not found" Errors
```bash
# Reinstall dependencies
npm run install:all
```

## 📊 Project Structure at a Glance

```
automation/
├── frontend/          # React app (Port 5173)
│   └── src/
│       ├── pages/     # Login, Register, Search, etc.
│       ├── components/  # Reusable UI components
│       └── services/  # API calls
│
├── backend/           # Express API (Port 5000)
│   ├── models/        # User, Review models
│   ├── routes/        # API endpoints
│   └── middleware/    # Auth, validation
│
└── README.md          # Full documentation
```

## 🎓 Learning Resources

### Frontend
- React: Modify files in `frontend/src/pages/`
- Styling: Edit `frontend/src/index.css`
- Translations: Update `frontend/src/i18n.js`

### Backend
- API Routes: Edit files in `backend/routes/`
- Database Models: Edit files in `backend/models/`
- Environment: Edit `backend/.env`

## 🚀 Next Steps

1. **Explore the Code**: Browse through the well-organized codebase
2. **Add Features**: Extend functionality as needed
3. **Customize Design**: Modify colors and styles in Tailwind config
4. **Deploy**: Follow `DEPLOYMENT.md` to go live

## 💡 Tips

- **Default Language**: Arabic (can be changed in `frontend/src/i18n.js`)
- **Admin Role**: Manually set in MongoDB to access admin panel
- **Hot Reload**: Code changes auto-refresh in development mode
- **API Docs**: All endpoints listed in `README.md`

## 📞 Need Help?

1. Check the full `README.md`
2. Review `DEPLOYMENT.md` for production setup
3. Inspect browser console for frontend errors
4. Check terminal logs for backend errors

---

**Happy Coding! 🎉**

Start building the future of artisan services in Morocco with HRFA.MA!
