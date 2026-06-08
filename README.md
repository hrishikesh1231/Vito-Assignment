# Vitto Loan Application Portal

## Live Demo

**Frontend:** https://vitto-frontend-psi.vercel.app/

**Backend API:** https://vito-assignment.onrender.com

---

## Project Overview

The Vitto Loan Application Portal is a full-stack web application built as part of the Vitto Full Stack Engineer Internship Assessment.

The application allows borrowers to submit loan applications, track application status using a unique reference ID, and enables agents to review and update loan application statuses through an admin dashboard.

The portal is fully responsive and optimized for both desktop and mobile devices.

---

## Features

### Borrower Features

* Submit loan applications
* Client-side form validation
* Generate unique application reference ID
* Copy reference ID to clipboard
* Track application status using reference ID
* View application details and status

### Agent Features

* Admin dashboard access
* View all loan applications
* Dashboard statistics
* Filter applications by status
* Approve or reject applications
* Real-time status updates

### Additional Features

* Mobile responsive design
* Professional UI using Tailwind CSS
* Secure PostgreSQL database
* RESTful API architecture
* Environment variable configuration
* UUID-based application tracking

---

## Application Workflow

### Loan Application Flow

1. User opens the portal
2. User clicks "Apply Loan"
3. User fills application form
4. Application is validated on client and server
5. Application is stored in PostgreSQL
6. Unique Reference ID is generated
7. User saves Reference ID

### Status Tracking Flow

1. User opens Track Application page
2. User enters Reference ID
3. System fetches application details
4. Current status is displayed

### Admin Flow

1. Admin accesses Dashboard
2. Admin enters dashboard password
3. Dashboard loads all applications
4. Admin reviews applications
5. Admin approves or rejects applications
6. Status updates instantly

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React
* SweetAlert2

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Neon Database

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Neon PostgreSQL

---

## Database Schema

### applications

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | VARCHAR   |
| mobile     | VARCHAR   |
| amount     | NUMERIC   |
| purpose    | TEXT      |
| language   | VARCHAR   |
| status     | VARCHAR   |
| created_at | TIMESTAMP |

Default Status:

```sql
pending
```

---

## API Endpoints

### Create Application

```http
POST /api/applications
```

### Get All Applications

```http
GET /api/applications
```

### Get Application By ID

```http
GET /api/applications/:id
```

### Update Application Status

```http
PATCH /api/applications/:id/status
```

### Dashboard Summary

```http
GET /api/applications/summary
```

---

## Environment Variables

Backend `.env`

```env
PORT=5000

DATABASE_URL=YOUR_DATABASE_URL
```

Frontend `.env`

```env
VITE_API_URL=YOUR_BACKEND_URL/api
```

---

## Local Setup

### Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Key Design Decisions

* UUID used as application reference number
* PostgreSQL used for reliable data storage
* Separate frontend and backend architecture
* Status-based workflow management
* Mobile-first responsive design
* Environment variables for security
* REST API following standard HTTP practices

---

## Future Improvements

* JWT Authentication
* Role-based access control
* SMS Notifications
* Email Notifications
* Search by mobile number
* Export applications to CSV
* Multi-agent dashboard
* Loan analytics and charts

---

## Author

Hrishikesh Prabhakar Gaonkar

Full Stack MERN Developer

GitHub: https://github.com/hrishikesh1231

LinkedIn: https://www.linkedin.com/in/hrishikesh-gaonkar-64519631b
