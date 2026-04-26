# 🚀 AeroTick
Secure Ticketing & Support System

---
AeroTick is a full-stack web application that allows users to create and manage support tickets while admins can monitor and update ticket statuses.  
This project is built as part of a technical assignment to demonstrate full-stack development skills including frontend, backend, authentication, and API integration.

---

## 📌 Features

### 👤 User Module
- User Registration & Login (JWT authentication)
- Create Support Tickets
- View Submitted Tickets

### 🛠️ Admin Module
- Admin Login
- View All Tickets
- Update Ticket Status (Open / In Progress / Resolved)

---

## 🔐 Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Basic Input Validation

---

## 🧰 Tech Stack

Frontend:
- React.js
- Axios
- CSS / Tailwind / Bootstrap

Backend:
- Node.js
- Express.js

Database:
- MongoDB (Mongoose)

---

## ⚙️ Setup Instructions (Local Machine)

### 1. Clone Repository
git clone https://github.com/your-username/aerotick.git
cd aerotick

---

### 2. Backend Setup

cd server
npm install

---

#### Database Configuration

This project uses a **config-based database connection (no .env file required)**.

MongoDB connection is handled inside:

config/db.js

You can directly update your MongoDB connection string inside this file.

Example:
- Open `server/config/db.js`
- Replace MongoDB URI with your own connection string

---

#### Run Backend

npm start

Backend runs on:
http://localhost:5000

---

### 3. Frontend Setup
cd client
npm install
npm start

Frontend runs on:
http://localhost:3000

---

## 🔗 API Endpoints

Auth:
- POST /api/auth/register → User registration
- POST /api/auth/login → Login

Tickets (User):
- POST /api/tickets → Create ticket
- GET /api/tickets → Get user tickets

Admin:
- GET /api/admin/tickets → Get all tickets
- PUT /api/tickets/:id → Update ticket status

---

## 🧪 Sample Admin Credentials (if applicable)

Email: admin@example.com  
Password: admin123

---

## 📸 UI Features

- Responsive design (Mobile + Desktop)
- Clean UI
- Role-based access control (User / Admin)

---

## ⏱️ Timeline

Completed within 48 Hours

---

## 📊 Evaluation Focus

- Code structure & clarity
- Core functionality
- API integration
- Security implementation (JWT + bcrypt)
- Responsive UI
- Git best practices

---

## 🧑‍💻 Author

Atul Kumar  
Frontend / Full Stack Developer  

---

## 📝 Notes

This project focuses on delivering a clean and functional MVP with proper authentication, role-based access, and scalable structure.

---

## ⭐ Future Improvements

- Email notifications
- Ticket comments
- File attachments
- Advanced admin dashboard
- Analytics system
