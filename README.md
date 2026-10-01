# CodeCrush

CodeCrush is a full-stack developer networking platform designed to connect software engineers based on technical skills, interests, and collaboration goals. The application enables users to discover peers, send match requests, manage incoming invitations, and establish professional connections.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#api-reference)
- [License](#license)

---

## Features

- **Candidate Discovery Feed**: Browse developer profiles displaying technical stack, professional bio, and relevant details.
- **Match Interactions**: Send interest or pass signals to streamline candidate matching.
- **Request Management**: Review, accept, or decline incoming connection requests.
- **Network Overview**: Access a centralized dashboard of accepted mutual connections.
- **Profile Configuration**: Interactive profile management with real-time preview of changes.
- **Authentication & Security**:
  - Stateless JSON Web Token (JWT) authentication stored in HTTP-only cookies.
  - Password encryption using bcrypt.
  - Middleware-based route protection on sensitive endpoints.

---

## Technology Stack

### Frontend
- **Framework**: React 19, Vite
- **State Management**: Redux Toolkit, React-Redux
- **Routing**: React Router v8
- **Styling**: Tailwind CSS v4, DaisyUI

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js 5
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `cookie-parser`
- **Validation & Security**: `validator`, `bcrypt`
- **Cross-Origin Handling**: `cors`

---

## Architecture

```
CodeCrush/
├── backend/
│   ├── index.js                  # Application entry point and middleware configuration
│   ├── package.json              # Backend dependencies and scripts
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # Database connection logic
│   │   ├── middlewares/
│   │   │   └── userAuth.js       # JWT validation middleware
│   │   ├── models/
│   │   │   ├── user.js           # User schema definition
│   │   │   └── connectionRequest.js # Connection request schema and statuses
│   │   └── routes/
│   │       ├── auth.js           # Authentication endpoints (/signup, /signin, /logout)
│   │       ├── profile.js        # Profile management endpoints
│   │       ├── request.js        # Match interaction endpoints
│   │       └── user.js           # Connection and feed queries
│   └── utils/
│       └── validation.js         # Input validation routines
│
└── frontend/
    ├── index.html                # HTML template
    ├── package.json              # Frontend dependencies and scripts
    ├── vite.config.js            # Vite build configuration
    └── src/
        ├── App.jsx               # Root router and Redux store provider
        ├── main.jsx              # Application bootstrap
        ├── components/
        │   ├── Body.jsx          # Shell layout container
        │   ├── NavBar.jsx        # Navigation bar
        │   ├── Footer.jsx        # Application footer
        │   ├── Feed.jsx          # Discovery feed
        │   ├── Card.jsx          # Profile summary card
        │   ├── Connection.jsx    # Connections directory
        │   ├── Requests.jsx      # Pending connection requests
        │   ├── Profile.jsx       # Profile edit and preview layout
        │   ├── EditProfile.jsx   # Profile editing form
        │   ├── ShowProfile.jsx   # Profile display card
        │   ├── Login.jsx         # User login form
        │   ├── SignUp.jsx        # User registration form
        │   └── Logout.jsx        # Sign out confirmation
        └── utils/
            ├── appStore.js       # Redux store configuration
            ├── userSlice.js      # User session state
            ├── feedSlice.js      # Feed candidate state
            ├── connectionSlice.js# Connections state
            └── requestSlice.js   # Incoming request state
```

---

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB instance (local or MongoDB Atlas connection string)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your database connection in `src/config/database.js`.
4. Start the server:
   ```bash
   npm run dev
   ```
   The backend service runs by default on `http://localhost:7777`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create an environment configuration file `.env` in the `frontend` root:
   ```env
   VITE_BASE_URL=http://localhost:7777
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will be available at `http://localhost:5173`.

---

## API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| `POST` | `/signup` | Register a new user | No |
| `POST` | `/signin` | Authenticate user and issue JWT cookie | No |
| `POST` | `/logout` | Invalidate session and clear auth cookie | Yes |

### Profile Management

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| `GET` | `/profile/view` | Fetch authenticated user profile | Yes |
| `PATCH` | `/profile/edit/:id` | Update profile information | Yes |

### Connection Requests & Feed

| Method | Endpoint | Description | Auth Required |
|:-------|:---------|:------------|:--------------|
| `GET` | `/feed` | Retrieve candidate discovery feed | Yes |
| `POST` | `/request/:status/:toUserId` | Send connection request (`interested` / `uninterested`) | Yes |
| `POST` | `/request/review/:status/:requestId` | Process connection request (`accepted` / `rejected`) | Yes |
| `GET` | `/user/requests/received` | List pending received connection requests | Yes |
| `GET` | `/user/connections` | List established mutual connections | Yes |

---

## License

This project is licensed under the ISC License.
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
