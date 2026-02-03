# HRFA.MA - Artisan & Client Platform

A bilingual (Arabic/English) platform connecting clients with skilled artisans in Morocco. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Bilingual Support**: Full Arabic and English localization with RTL support
- **Authentication**: JWT-based authentication with role-based access control
- **User Roles**: Client, Artisan, and Admin roles
- **Artisan Profiles**: Searchable profiles with ratings, reviews, and portfolios
- **Search & Filter**: Find artisans by profession, city, and keywords
- **Reviews & Ratings**: Clients can review artisans, with automatic rating calculations
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Premium Accounts**: Artisans can upgrade to premium for enhanced visibility

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## 🛠️ Installation

### 1. Clone the repository
```bash
cd automation
```

### 2. Install dependencies
```bash
npm run install:all
```

This will install dependencies for both frontend and backend.

### 3. Configure environment variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hrfa-ma
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 5. Run the application
```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run separately:
npm run dev:frontend  # Frontend on http://localhost:5173
npm run dev:backend   # Backend on http://localhost:5000
```

## 📁 Project Structure

```
automation/
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── i18n.js         # Internationalization config
│   │   └── main.jsx        # App entry point
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                 # Node.js + Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Server entry point
│   └── package.json
│
└── package.json            # Workspace root
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Artisans
- `GET /api/artisans` - Get all artisans (with filters)
- `GET /api/artisans/:id` - Get artisan by ID
- `GET /api/artisans/stats/overview` - Get artisan statistics

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)
- `GET /api/users` - Get all users (Admin)
- `PUT /api/users/:id/status` - Update user status (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Reviews
- `POST /api/reviews` - Create review (Protected/Client)
- `GET /api/reviews/artisan/:artisanId` - Get reviews for artisan
- `GET /api/reviews` - Get all reviews (Admin)
- `PUT /api/reviews/:id/approve` - Approve/reject review (Admin)
- `DELETE /api/reviews/:id` - Delete review (Owner/Admin)

## 🎨 Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **i18next** - Internationalization
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Request validation

## 🌍 Localization

The app supports Arabic (default) and English with:
- RTL (Right-to-Left) layout for Arabic
- Dynamic font switching (Cairo for Arabic, Inter for English)
- Complete UI translations in both languages

## 👤 Default Admin Account

To create an admin account, you can directly insert into MongoDB or modify a user's role:

```javascript
// In MongoDB shell or Compass
use hrfa-ma
db.users.updateOne(
  { email: "admin@hrfa.ma" },
  { $set: { role: "admin" } }
)
```

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Request validation with express-validator
- CORS configuration
- Role-based access control
- Protected routes and API endpoints

## 📱 Mobile Support

The application is fully responsive and optimized for:
- Mobile phones
- Tablets
- Desktop screens
- RTL and LTR layouts

## 🚢 Deployment

### Frontend (Vercel, Netlify, etc.)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku, Railway, etc.)
- Set environment variables
- Use MongoDB Atlas for production database
- Change `NODE_ENV` to `production`
- Set a strong `JWT_SECRET`

## 📄 License

MIT License

## 👨‍💻 Developer

HRFA.MA - Connecting Artisans with Clients in Morocco

---

**Note**: This is an MVP (Minimum Viable Product). For production use, consider adding:
- File upload for profile photos and portfolio images
- Email verification
- Password reset functionality
- Advanced search with geolocation
- Payment integration for premium accounts
- Real-time notifications
