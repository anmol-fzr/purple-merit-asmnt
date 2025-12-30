# Mini User Management System

A full-stack web application developed as part of the **Purple Merit Technologies – Backend Developer Intern Assessment**.  
The system implements secure authentication, role-based authorization (RBAC), and user lifecycle management following clean backend architectural practices.

---

## 🚀 Live Project Links

- **Frontend Application:** https://your-frontend-link.vercel.app  
- **Backend API:** https://your-backend-link.render.com  
- **API Documentation (Postman / Swagger):** https://your-api-docs-link  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Tanstack Router
- Tanstack Query

### Backend
- [Bun](https://bun.sh)
- [Hono](http://hono.dev/)
- JSON Web Tokens (JWT)

### Database
- MongoDB Atlas (Cloud Database)

### Deployment
- Frontend: Netlify  
- Backend: Railway  

---

## ✨ Features

### 🔐 Authentication
- User registration with validation
- Secure login with JWT-based authentication
- Password hashing using Bcrypt
- Protected API routes

### 🛡️ Role-Based Access Control (RBAC)
- **Admin**
  - View all users
  - Activate / deactivate user accounts
- **User**
  - View personal profile
  - Update profile information
  - Change password
- Route-level authorization enforcement

### 👤 User Management
- User account status handling (Active / Inactive)
- Secure profile update flow
- Token-based session handling

---

## 📂 Project Structure
.
├── apps
│   ├── server
│   └── web
└── packages
    ├── config
    ├── db
    └── env

8 directories

---
