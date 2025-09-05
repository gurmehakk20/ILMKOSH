# Ilmkosh 📚  
*A Treasure of Knowledge*  

[![Frontend - Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://ilmkosh.vercel.app/)  
[![Backend - Render](https://img.shields.io/badge/Backend-Render-blue?logo=render)](https://ilmkosh.onrender.com/)  
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)  
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=FFD62E)  
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)  
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)  
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)  
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  

Ilmkosh is a **full-stack digital library and knowledge-sharing platform** that enables users to **discover, browse, save, and contribute books** across genres. Built with a modern tech stack, it provides a seamless experience for managing and sharing knowledge in a community-driven way.

---

## Table of Contents
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Deployment](#deployment)  
- [API Endpoints](#api-endpoints)  
- [Contributing](#contributing)  
- [License](#license)  
- [Vision](#vision)  

---

## Features
- 🔑 **Authentication & Profiles** — User registration, login, and JWT-protected routes.  
- 📚 **Book Discovery** — Browse books by genre, search by title, and view detailed information.  
- ❤️ **Personalization** — Save favorite books to a personal list.  
- 📤 **Contributions** — Upload new books (with file uploads) to enrich the shared library.  
- 🛒 **Cart (Coming Soon)** — Manage books you intend to read or borrow.  

---

## Tech Stack
**Frontend**  
- React (with Vite for fast builds)  
- Tailwind CSS (responsive, modern UI)  
- React Router (client-side navigation)  

**Backend**  
- Node.js + Express  
- MongoDB (Mongoose ODM)  
- JWT Authentication  

**Deployment**  
- Frontend: Vercel  
- Backend: Render  

---

## Project Structure
```bash
Ilmkosh/
│
├── client/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/       # Images, icons
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page-level views
│   │   ├── utils/        # Helper functions
│   │   └── App.jsx       # Main app component
│   └── ...
│
├── server/               # Backend (Node.js + Express)
│   ├── controllers/      # Business logic
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Auth, validation
│   └── server.js         # Entry point
│
├── .env                  # Environment variables
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js (>= 16)  
- MongoDB (local or Atlas)  

### Installation
```bash
git clone https://github.com/gurmehakk20/ILMKOSH
cd ILMKOSH

# Client
cd client
npm install

# Server
cd ../server
npm install
```

### Run Locally

Start the backend:
```bash
cd server
npm run dev
```

Start the frontend:
```bash
cd client
npm run dev
```

Access the application at:
- **Frontend:** `http://localhost:5173`  
- **Backend:** `http://localhost:5000`  

---

## Environment Variables

Both frontend and backend require environment configuration:

**Server (`server/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Client (`client/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## Deployment
- **Frontend:** Hosted on [Vercel](https://ilmkosh.vercel.app/)  
- **Backend:** Hosted on [Render](https://ilmkosh.onrender.com/)  

Environment variables are configured to support both local and production setups.

---

## API Endpoints

**Auth Routes**
```http
POST /api/auth/register    → Register a new user
POST /api/auth/login       → Login and receive JWT
```

**Book Routes**
```http
GET  /api/books            → Fetch all books
GET  /api/books/:id        → Fetch single book details
POST /api/books            → Upload a new book (protected)
```

**User Routes**
```http
GET  /api/users/me         → Get user profile
POST /api/users/save/:bookId → Save a book to favorites
GET  /api/users/saved      → Get saved books
```

---

## Contributing
Contributions are welcome!  

1. Fork the repository  
2. Create a new branch (`feature/your-feature`)  
3. Commit your changes  
4. Push the branch and open a Pull Request  

---

## License
This project is licensed under the **MIT License**.

---

## Vision
Ilmkosh strives to become a **community-driven digital library** for students, educators, book clubs, and knowledge enthusiasts. By fostering contributions and personalization, it aims to grow into a collaborative hub for lifelong learning.
