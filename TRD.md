# Technical Requirements Document (TRD)

## Project Name

SkillForge Learning Management System

## Version

1.0.0

## Date

April 26, 2026

## Author

SkillForge Development Team

---

## Executive Summary

SkillForge is a modern learning management system designed to empower learners and instructors through a scalable, secure, and user-friendly web application. The system supports course discovery, user authentication, course creation, enrollment tracking, progress management, and feedback through ratings and reviews.

This document defines the technical requirements, architecture, data models, and deployment considerations for the SkillForge platform. It is intended for developers, stakeholders, and project reviewers to understand the technical scope and implementation approach.

---

## 1. Purpose

The purpose of this Technical Requirements Document is to define the core functional and non-functional requirements, architecture, data model assumptions, and system behavior for SkillForge, a full-stack learning management system (LMS). This document describes the system from a technical perspective and serves as a reference for developers, stakeholders, and reviewers.

---

## 2. Project Overview

SkillForge is an LMS designed to connect learners and instructors through an online course marketplace. The system supports user registration, secure authentication, course browsing, creation and management of course content, enrollment tracking, progress monitoring, reviews and ratings, and profile management.

The project is implemented as a two-part application:

- `skillforge-frontend/` — React application built with Vite, Tailwind CSS, Redux Toolkit, and React Router DOM.
- `skillforge-backend/` — Node.js and Express API with MongoDB, Mongoose, JWT-based authentication, file upload support, and email utilities.

---

## 3. Scope

### In Scope

- User authentication and account management
- Email verification and password reset flow
- Course catalog with filtering and search capability
- Instructor course creation and content management
- Student enrollment and course completion tracking
- Course review and rating system
- Responsive UI for desktop and mobile
- Backend APIs for course, profile, section, subsection, progress, and review operations

### Out of Scope

- Payment gateway integration
- Live classroom or video conferencing
- Advanced analytics and reporting dashboards beyond enrollment/progress views
- Multi-tenant architecture or enterprise deployment features

---

## 4. Stakeholders

- Product Owner
- Developers
- UX/UI Designers
- QA/Testers
- Learners
- Instructors

---

## 5. User Roles and Permissions

### Administrator (future scope)

- Manage application data and user accounts
- Review system analytics

### Instructor

- Create, edit, and publish courses
- Add sections and subsections to courses
- View enrolled students and course-related data

### Learner

- Browse and search available courses
- Enroll in courses
- Track learning progress across lessons and sections
- Submit reviews and ratings
- Manage user profile and account information

---

## 6. Functional Requirements

### 6.1 Authentication

- FR-1: Users can register with name, email, phone, and password.
- FR-2: Users can log in with email and password.
- FR-3: Users must verify their email address before full access.
- FR-4: Users can request a password reset via email.
- FR-5: Users can update their password after verification.

### 6.2 Profile Management

- FR-6: Users can view and edit profile information.
- FR-7: Users can upload or update their profile avatar.
- FR-8: Profile updates persist to the backend.

### 6.3 Course Catalog and Discovery

- FR-9: Users can view a list of courses with key information.
- FR-10: Users can filter courses by category.
- FR-11: Users can search for courses by keyword.
- FR-12: Users can view course details including sections, rating, instructor information, and description.

### 6.4 Course Creation and Management

- FR-13: Instructors can create new courses with title, description, category, price, and media.
- FR-14: Instructors can add, edit, and remove sections and subsections.
- FR-15: Course content structure is hierarchical: course → section → subsection.

### 6.5 Enrollment and Progress Tracking

- FR-16: Learners can enroll in available courses.
- FR-17: Learners can view enrolled course list.
- FR-18: Learners can track progress by marking lessons as completed.
- FR-19: Progress data is stored and updated in the backend.

### 6.6 Reviews and Ratings

- FR-20: Learners can submit ratings and reviews for courses.
- FR-21: Course pages display the average rating and review summary.
- FR-22: Reviews include a text comment and star rating.

### 6.7 Application Navigation and UI

- FR-23: The application uses client-side routing for pages and protected routes.
- FR-24: UI must be responsive and maintain usability on mobile and desktop screens.
- FR-25: Feedback is shown for successful and failed actions using toast notifications.

---

## 7. Non-functional Requirements

### 7.1 Performance

- NFR-1: Frontend pages should load quickly in modern browsers.
- NFR-2: API responses should be fast for typical CRUD operations.

### 7.2 Security

- NFR-3: Passwords must be hashed before storage.
- NFR-4: JSON Web Tokens (JWT) must be used to secure protected endpoints.
- NFR-5: Sensitive environment values must be stored in `.env` files.

### 7.3 Reliability

- NFR-6: The backend API should handle invalid requests gracefully.
- NFR-7: The system should prevent unauthorized access to protected resources.

### 7.4 Maintainability

- NFR-8: Code should be organized by feature domain and follow a consistent style.
- NFR-9: Documentation should include setup instructions and architectural details.

### 7.5 Usability

- NFR-10: The user interface should be intuitive and easy to navigate.
- NFR-11: Error messages should be clear and actionable.

---

## 8. System Architecture

### 8.1 Frontend

- React with Vite for fast development and production builds.
- Tailwind CSS for responsive styling.
- Redux Toolkit for global state management.
- React Router DOM for client-side route management.
- Axios for HTTP requests to backend APIs.

### 8.2 Backend

- Node.js with Express for RESTful API endpoints.
- MongoDB as the primary data store.
- Mongoose for object modeling and schema definitions.
- JWT for authentication and authorization.
- Nodemailer for email verification and password reset.
- Cloudinary for image upload and storage.

### 8.3 Data Flow

1. User interacts with the frontend UI.
2. Frontend sends API requests to backend endpoints.
3. Backend performs validation, database operations, and business logic.
4. Backend returns JSON responses to frontend.
5. Frontend updates UI based on responses.

---

## 9. Data Model Summary

### 9.1 User

- `name`
- `email`
- `passwordHash`
- `phone`
- `avatar`
- `role` (learner, instructor)
- `verified`
- `enrollments`

### 9.2 Course

- `title`
- `description`
- `category`
- `price`
- `instructorId`
- `sections`
- `rating`
- `reviews`
- `thumbnail`

### 9.3 Section

- `title`
- `courseId`
- `subsections`

### 9.4 Subsection

- `title`
- `contentUrl`
- `duration`

### 9.5 Review

- `courseId`
- `userId`
- `rating`
- `comment`
- `createdAt`

### 9.6 Progress

- `userId`
- `courseId`
- `completedLessons`
- `progressPercentage`

---

## 10. API and Integration Requirements

- Backend APIs must expose endpoints for authentication, profile, course data, progress, and review management.
- The frontend must authenticate and store JWT tokens securely in browser storage.
- The system must support file uploads for course media and profile avatars via Cloudinary.
- Email workflows must support verification codes and password reset links.

---

## 11. Deployment Requirements

- The frontend can be deployed as a static site using Vite build output.
- The backend should run on Node.js hosting with access to MongoDB.
- Environment variables must be configured before deployment.
- The root project uses `npm run dev` to launch both client and server concurrently during development.

---

## 12. Assumptions

- Users will have modern web browsers with JavaScript enabled.
- Cloudinary will be available for media storage.
- MongoDB is the chosen persistent database.
- Email service credentials are valid and configured correctly.

---

## 13. Glossary

- LMS: Learning Management System
- JWT: JSON Web Token
- UI: User Interface
- API: Application Programming Interface
- CRUD: Create, Read, Update, Delete
- UX: User Experience

---

## 14. Future Enhancements

- Payment processing and purchases
- Live class streaming and conferencing
- Analytics dashboards for instructors and administrators
- Support for certifications and course completion certificates
- Multi-language support
