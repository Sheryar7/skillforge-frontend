# SkillForge Learning Management System

## Overview

SkillForge is a professional learning management system (LMS) built as a full-stack web application. It empowers learners and instructors with an online course marketplace, course creation tools, enrollment management, progress tracking, reviews, and secure authentication.

This repository contains the frontend application for SkillForge, built with React, Vite, Tailwind CSS, and Redux.

## What I Built

- Responsive course catalog with category filters and search functionality
- User authentication with signup, login, email verification, password reset, and protected routes
- Instructor dashboard for managing courses, sections, and subsections
- Student dashboard for tracking enrollments, course progress, and purchased content
- Course detail pages with ratings, reviews, and multimedia playback support
- Profile management with editable user data, avatar uploads, and account settings
- Smooth UI interactions using React Router, Swiper, and animated components

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, Redux Toolkit, React Router DOM, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT authentication, Nodemailer, Cloudinary
- Libraries: react-hook-form, react-hot-toast, react-player, react-rating-stars-component, swiper

## Key Features

- Authentication flow with email verification and password recovery
- Course browsing, filtering, and search experience
- Enrollment and course access control
- Progress tracking across sections and lessons
- Ratings and reviews with user feedback
- Responsive UI for desktop and mobile devices
- Dashboard pages for students and instructors

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or Yarn installed
- MongoDB connection for backend
- Cloudinary account for image upload support (optional but recommended)

### Install dependencies

From the workspace root:

```bash
npm install
```

Then install frontend dependencies:

```bash
cd skillforge-frontend
npm install
```

Install backend dependencies separately:

```bash
cd ../skillforge-backend
npm install
```

### Run in development

From the project root, start both frontend and backend together:

```bash
npm run dev
```

This uses `concurrently` to run the frontend and backend in parallel.

Alternatively, start individually:

```bash
cd skillforge-frontend
npm run dev
```

and in another terminal:

```bash
cd skillforge-backend
npm run dev
```

## Environment Configuration

The backend requires environment variables for MongoDB, JWT, Cloudinary, and email settings. Create a `.env` file in `skillforge-backend` with values similar to:

```env
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_HOST=...
EMAIL_PORT=...
EMAIL_USER=...
EMAIL_PASS=...
```

## Folder Structure

- `skillforge-frontend/` — React application, UI components, pages, Redux slices, service API clients
- `skillforge-backend/` — Express server, database models, controllers, routes, middleware, utilities
- `package.json` — root scripts to launch both client and server concurrently

## Notes

- The frontend README is focused on the client application.
- Backend logic and API endpoints are implemented inside `skillforge-backend/`.
- Customize environment variables before running the full application.

## License

This project is available for personal and educational use. Update the license section as needed for your intended distribution.
