# Himalaya Neo Tech Project

This repository contains a full-stack web application with a React frontend and an Express.js backend using MySQL as the database. The project is structured for easy development and deployment.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Live Demo](#live-demo)
- [Folder Structure](#folder-structure)

---

## Project Overview

This project provides a platform for user authentication, solution management, and dashboard analytics. It is designed for scalability and security, following best practices for modern web development.

## Features

- User registration and login with JWT authentication
- Secure password hashing
- Role-based access control
- Solution CRUD operations
- Dashboard with analytics
- Rate limiting and security headers
- Responsive UI with React

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MySQL, JWT, dotenv, Helmet, CORS

## Getting Started

### Backend Setup

1. Go to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the required variables (see below).
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Go to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `frontend` folder with the required variables (see below).
4. Start the frontend server:
   ```sh
   npm run dev
   ```

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=8000
DATABASE_URL=your_mysql_connection_url
# Or use the following if not using DATABASE_URL
# MYSQLHOST=your_mysql_host
# MYSQLUSER=your_mysql_user
# MYSQLPASSWORD=your_mysql_password
# MYSQLDATABASE=your_mysql_database
# MYSQLPORT=your_mysql_port
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
SALT_ROUNDS=10
FRONTEND_URL=http://localhost:5173
```

### Frontend

Create a `.env` file in the `frontend` directory with the following variable:

```
VITE_API_URL=http://localhost:8000
```

## Live Demo

- **Frontend:** https://himalaya-neo-tech-nepal.vercel.app
- **Backend:** https://himalaya-neo-tech-nepal.onrender.com

## Folder Structure

```
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  server.js
frontend/
  public/
  src/
    assets/
    components/
    context/
    pages/
    schema/
    services/
  index.html
  vite.config.js
```
