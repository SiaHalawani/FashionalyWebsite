# 🧥 Fashionaly — A Smart Fashion Social Platform

> Senior Project for CSIS290 – Spring Semester 2025  
> **Sondos Halawani (A2112613)** & **David Kharrat (A2110272)**  
> Instructor: **Dr. Charbel Fakhry**  

> GitHub Repository: https://github.com/SiaHalawani/FashionalyWebsite

---

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Motivation & Objectives](#motivation--objectives)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Database Design (Sequelize Models)](#database-design-sequelize-models)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [How to Run the App (All Services)](#how-to-run-the-app-all-services)
- [API Endpoints (Full Reference)](#api-endpoints-full-reference)
- [AI Outfit Suggestion Engine](#ai-outfit-suggestion-engine)
- [Future Enhancements](#future-enhancements)
- [Credits](#credits)

---

## 🎯 Project Overview

Fashionaly is a fashion-forward platform that combines personal wardrobe management, seller item discovery, AI-powered outfit recommendations, and social interactions — all inside one sleek, accessible interface.

---

## 💡 Motivation & Objectives

- Offer users a space to curate and organize their wardrobe
- Help users and buyers discover personalized outfits using AI
- Enable social interactions through likes, follows, and stories
- Provide an outlet for sellers to promote and monetize fashion content

---

## 🌟 Key Features

| Type              | Feature Description                                                        |
|-------------------|----------------------------------------------------------------------------|
| 👚 Wardrobe        | Add, categorize, edit wardrobe items with images                          |
| 🤖 AI Suggestions  | Outfit generation from wardrobe + seller items using OpenAI                |
| 📸 Posts           | Create public/private social posts with engagement features               |
| 📖 Stories/Highlights | Add, view, and organize story content like Instagram                   |
| 🛒 Seller Items    | List items with price, visibility, and stripe checkout                   |
| 💬 Chat            | Firebase-based messaging between followed users                           |
| 🔔 Notifications   | Like, comment, follow notifications                                        |
| 🧠 Explore Engine  | Discover new users, items, and outfits via filters                        |
| 🎨 Theming         | Customizable UI themes (light/dark/system-based)                          |
| 🧾 Orders          | Add items to cart, confirm checkout with Stripe integration               |

---

## 🧰 Technology Stack

| Layer         | Tools Used                                                                 |
|---------------|----------------------------------------------------------------------------|
| Frontend      | React, Vite, Axios, Chart.js, Lucide Icons, CSS Modules                    |
| Backend       | Node.js, Express, Sequelize (PostgreSQL), Firebase                         |
| Database      | PostgreSQL (users, posts, likes), Firestore (stories, seller posts)        |
| Auth          | JWT (JSON Web Tokens)                                                      |
| Media Hosting | ImageKit, Multer                                                           |
| AI Engine     | OpenAI API                                                                 |
| Payments      | Stripe API                                                                 |
| Real-Time     | Firebase Chat and Stories                                                  |
| DevOps        | Vercel, Localhost, Railway/Render (Backend optional deployment)            |

---

## 🏗 System Architecture

```
Frontend (Vite + React)
  ↓
Axios API Requests
  ↓
Backend (Express + Sequelize + Firebase)
  ├── PostgreSQL (User, Wardrobe, Posts, Likes, Comments)
  ├── Firestore (Stories, Explore, Seller Ads)
  ├── Stripe Checkout
  └── OpenAI API (AI Outfit Suggestions)
```

---

## 🗃️ Database Design (Sequelize Models)

Sequelize models include:
- `user`, `wardrobe`, `wardrobeitem`, `wardrobecategory`
- `socialpost`, `like`, `comment`, `follower`, `collection`
- `outfit`, `collectionoutfit`, `order`, `orderitem`, `notification`
- `highlight`, `highlightstory`, `story`, `airecommendation`, `category`

These models maintain referential integrity and scalability.

---

## 📁 Project Structure

```
FashionalyWebsite/
├── backend/                         # Express backend + Sequelize + AI Stylo service
│   ├── AI_CHATBOT/                  # AI Outfit Suggestion (Stylo)
│   ├── controllers/                 # Route controllers
│   ├── middlewares/                # Auth & validation middleware
│   ├── routes/                     # API route definitions
│   ├── services/                   # Business logic (likes, follows, etc.)
│   ├── uploads/                    # Multer/image uploads if used locally
│   ├── validators/                 # Joi/Express-validator schemas
│   ├── app.js / index.js           # Entry points
│   └── sequelize.js                # Sequelize instance
│
├── databases/
│   ├── firebase/                   # Firestore: seller items, stories, chats
│   │   ├── ExploreService/
│   │   │   ├── PostServer.js       # Ads explore logic
│   │   │   └── ExploreServer.js    # Explore ranking engine
│   │   ├── firestoreHelpers.js     # Firebase utility helpers
│   │   ├── firebase.js             # Firebase initialization
│   │   ├── server.js               # General Firebase service
│   │   └── sellerserver.js         # Firebase Seller API
│   └── postgres/                   # Sequelize (PostgreSQL)
│       ├── models/                 # All models like User, Post, Item, etc.
│       ├── migrations/             # Schema migrations
│       ├── seeders/                # Seed data
│       ├── config.json             # DB config
│       └── testPostgres.js         # Test connection script
│
├── my-react-app/                   # Vite + React Frontend
│   ├── public/                     # Public assets (fallbacks, icons)
│   ├── src/
│   │   ├── API/                    # AI and Weather API logic
│   │   ├── BackendIntegration/
│   │   │   ├── AxiosConnections/   # Axios APIs
│   │   │   ├── SellerData/
│   │   │   ├── UserData/
│   │   │   ├── StoriesHighlights/
│   │   │   └── LikeComment/
│   │   ├── Vitals/
│   │   │   ├── Components/         # UI elements like buttons/inputs
│   │   │   ├── Bodies/             # Main layout pages and routes
│   │   ├── Utils/                  # LocalStorage, Image Upload tools
│   │   ├── assets/                 # Images and CSS
│   │   ├── App.jsx / main.jsx      # Root files
│   │   └── .env                    # Vite environment variables
│
├── .gitignore
├── package.json / README.md / vite.config.js
└── .sequelizerc
```

```
FashionalyWebsite/
├── backend/                    # Express.js + PostgreSQL
├── my-react-app/              # Vite + React frontend
├── databases/
│   ├── firebase/              # Seller and story services
│   └── postgres/              # Sequelize models and migrations
├── .sequelizerc
└── README.md
```

---

## ⚙ Installation & Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd my-react-app
npm install
npm run dev
```

### Firebase/Explore/Chat Services
```bash
node databases/firebase/server.js
node databases/firebase/sellerserver.js
node databases/firebase/ExploreService/PostServer.js
node databases/firebase/exploreService/exploreserver.js
node backend/AI_CHATBOT/API/index.js
```

---

## 🔐 Environment Variables

**Frontend (`.env`)**
```env
VITE_BACKEND_URL=http://localhost:5005
VITE_WEATHER_API_KEY=72859f69d6374bf587972236250205
```

**Backend (`.env`)**
```env
DATABASE_URL=postgres://...
STRIPE_SECRET_KEY=...
FIREBASE_PROJECT_ID=...
OPENAI_API_KEY=...
```

---

## ▶ How to Run the App (All Services)

Make sure all 7 services are running for full functionality:

| Service                | Command                                                   | Port         |
|------------------------|-----------------------------------------------------------|--------------|
| Backend (Express)      | `npm run dev` inside `/backend`                           | `:5005`      |
| Frontend (Vite)        | `npm run dev` inside `/my-react-app`                      | `:5173`      |
| Firebase Base API      | `node server.js` inside `databases/firebase`             | `:5000`      |
| Seller API             | `node sellerserver.js` inside `databases/firebase`       | `:5001`      |
| Explore Posts Service  | `node PostServer.js` inside `ExploreService/`            | `:5078`      |
| Explore Ranking Service| `node exploreserver.js` inside `exploreService/`         | `:5077`      |
| AI Chat/Stylo API      | `node index.js` inside `backend/AI_CHATBOT/API`          | `:5033`      |

---

## 📡 API Endpoints (Full Reference)

> From `newPotman_ALLAPIS` file — structured per category:

### 🧑 User Routes
- `POST /api/users/register` – Register
- `POST /api/users/login` – Login
- `GET /api/users/:userID` – Get profile

### 🧵 Wardrobe Routes
- `POST /api/wardrobe` – Create wardrobe
- `GET /api/wardrobe/all` – Get user wardrobes
- `DELETE /api/wardrobe/:id` – Delete wardrobe

### 👚 Wardrobe Item Routes
- `POST /api/wardrobe-items` – Add item
- `GET /api/wardrobe-items/feed/:userID` – Get followed items
- `GET /api/wardrobe-items/:id` – Single item
- `DELETE /api/wardrobe-items/:id` – Remove item

### 💬 Social Post Routes
- `GET /api/posts/feed`
- `POST /api/posts` / `PATCH /:id` / `DELETE /:id`
- `GET /api/posts/:id` – View one post

### ❤️ Like & Comment Routes
- `POST /api/likes` / `DELETE /:postID`
- `POST /api/comments` / `GET /api/comments/:postID`

### 📢 Notification Routes
- `GET /api/notifications` – Fetch all
- `PATCH /api/notifications/:id` – Mark as read

### 🔍 Explore & Search Routes
- `GET /api/explore` – Filtered discovery
- `GET /api/users/search?q=query` – Global search

### 📖 Story & Highlight Routes
- `POST /api/stories` / `GET /api/stories/following`
- `POST /api/highlights` / `GET /api/highlights/:userID`
- `POST /api/highlights/:highlightID/add` – Add to highlight

### 🧠 AI Routes
- `POST /api/ai/recommendation` – Outfit generation (Stylo)

### 🛍️ Seller/Firebase Routes
- `GET /seller/:sellerID/items` – Get seller items
- `POST /seller/posts` – Create seller ad
- `GET /seller/posts/explore` – Get sponsored posts

---

## 🧠 AI Outfit Suggestion Engine

Our smart recommendation logic uses:
- User wardrobe filters (color, season, gender, brand, material)
- Seller inventory with compatible tags
- Custom scoring + OpenAI GPT prompt enhancement
- Styled JSON results with 5 top items

---

## 🔮 Future Enhancements

- Mobile app (React Native)
- Admin panel for sellers & analytics
- Marketplace ranking system
- Follower-seller recommendations
- Enhanced push notification system

---

## 👨‍🏫 Credits

**Project Title**: *Fashionaly — Smart Fashion Social Platform*  
**Course**: CSIS290 – Senior Project  
**Instructor**: Dr. Charbel Fakhry  
**Semester**: Spring 2025  
**Authors**:  
- **Sondos Halawani (A2112613)**  
- **David Kharrat (A2110272)**

> © 2025 – University of Balamand – Department of Computer Science