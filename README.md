# 👩‍💻 DevTinder

DevTinder is a full-stack social networking application built specifically for software developers. Connect, network, discover peers with shared tech stacks, and collaborate on projects with ease.

---

## 🚀 Features

- **Developer Discovery (Feed)**: Browse developer profiles featuring bio, skills, and profile photos.
- **Match Actions**: Quick actions to send `Interested` or `Uninterested` requests.
- **Connection Requests**: View incoming requests and either **Accept** or **Reject** them.
- **Connections Network**: See all mutual connections with contact details, skills, and about sections.
- **Profile Management**:
  - Live interactive profile preview as you update your details.
  - Custom skills tags, bio, avatar URL, and user details.
- **Secure Authentication**:
  - Cookie-based authentication with JSON Web Tokens (JWT).
  - Password hashing with bcrypt.
  - Protected API routes and client-side auth state management.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router v8
- **Styling**: Tailwind CSS v4 + DaisyUI

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (`jsonwebtoken`) & `cookie-parser`
- **Security & Validation**: `bcrypt` & `validator`
- **CORS**: `cors` configured for local and client credentials

---

## 📂 Project Architecture

```
DevTinder/
├── backend/
│   ├── index.js                  # Express server entry point & route registration
│   ├── package.json
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # MongoDB connection configuration
│   │   ├── middlewares/
│   │   │   └── userAuth.js       # JWT cookie verification middleware
│   │   ├── models/
│   │   │   ├── user.js           # User schema & password comparison
│   │   │   └── connectionRequest.js # Request status schema (interested/ignored/accepted/rejected)
│   │   └── routes/
│   │       ├── auth.js           # /signup, /signin, /logout
│   │       ├── profile.js        # /profile/view, /profile/edit/:id
│   │       ├── request.js        # /request/send, /request/review
│   │       └── user.js           # /user/connections, /user/requests, /feed
│   └── utils/
│       └── validation.js         # Input validation helpers
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx               # App routing and Redux Provider
        ├── index.css             # Tailwind CSS & DaisyUI entry
        ├── main.jsx
        ├── components/
        │   ├── Body.jsx          # Main layout container & user state bootstrapping
        │   ├── NavBar.jsx        # Navigation bar with user badge and dropdown
        │   ├── Footer.jsx        # Responsive footer
        │   ├── Feed.jsx          # Developer card discovery feed
        │   ├── Card.jsx          # Reusable developer card with tags and actions
        │   ├── Connection.jsx    # Connections grid view
        │   ├── Requests.jsx      # Incoming match requests
        │   ├── Profile.jsx       # Profile editor + live card preview
        │   ├── EditProfile.jsx   # Profile editing form
        │   ├── ShowProfile.jsx   # Live profile card preview
        │   ├── Login.jsx         # Sign in page
        │   ├── SignUp.jsx        # Registration page
        │   └── Logout.jsx        # Sign out confirmation
        └── utils/
            ├── appStore.js       # Redux store
            ├── userSlice.js      # Current user state
            ├── feedSlice.js      # Feed list state
            ├── connectionSlice.js# Connections state
            └── requestSlice.js   # Requests state
```

---

## 🚦 Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or later
- **MongoDB**: Local MongoDB instance or MongoDB Atlas connection string

---

### 2. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure your MongoDB connection string in [backend/src/config/database.js](backend/src/config/database.js) is configured.
4. Start the server (runs on `http://localhost:7777` by default):
   ```bash
   npm run dev
   # or
   npm start
   ```

---

### 3. Frontend Setup

1. Open another terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or check `.env` in the `frontend` folder with your backend URL:
   ```env
   VITE_BASE_URL=http://localhost:7777
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:5173`.

---

## 🔌 API Reference Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/signup` | Register a new developer account | No |
| `POST` | `/signin` | Authenticate user & issue JWT cookie | No |
| `POST` | `/logout` | Clear auth cookie | Yes |
| `GET` | `/profile/view` | Get current user profile | Yes |
| `PATCH` | `/profile/edit/:id` | Update profile information | Yes |
| `POST` | `/request/:status/:toUserId` | Send match request (`interested` / `uninterested`) | Yes |
| `POST` | `/request/review/:status/:requestId` | Review request (`accepted` / `rejected`) | Yes |
| `GET` | `/user/requests/received` | List pending received connection requests | Yes |
| `GET` | `/user/connections` | List mutual connections | Yes |
| `GET` | `/feed` | Get discovery feed of developers | Yes |

---

## 📄 License
ISC
