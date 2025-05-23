# LifeLinkr Admin Panel (Assignment)

A full-featured **MERN Stack Admin Panel** built for employee management and authentication. This panel supports login, employee creation/editing, image uploads (JPG/PNG), server/client-side validation, and complete CRUD functionality.

## 🌐 Live Demo

Test the live application here: https://lifelinkrr.onrender.com/
---

## 🚀 Tech Stack

### Backend:

* **Node.js**, **Express.js**
* **MongoDB**, **Mongoose**
* **JWT** (Authentication)
* **Multer**, **Cloudinary** (Image Upload)
* **bcrypt** (Password Hashing)
* **dotenv**, **uuid**, **cors**, **morgan**

### Frontend:

* **React.js** (with Vite)
* **React Router DOM**
* **Material UI (MUI)** & **Emotion**
* **Axios**, **Recharts**

---

## 📁 Project Structure

```
├── backend (lifelinkr_assignment)
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
└── frontend
    ├── components/
    ├── pages/
    ├── services/
    └── main.jsx
```

---

## ✨ Features

### 🔐 Authentication

* Secure JWT-based login
* LocalStorage token management
* Redirect to dashboard after successful login
* Alert on invalid credentials

### 👨‍💼 Employee Management

* **Fields**: Name, Email, Mobile, Designation, Gender, Course, Image
* **Validations**:

  * Client-side: JavaScript + MUI
  * Server-side: Express
  * Duplicate email check
  * Mobile numeric check
  * Valid email format
* **File Upload**:

  * Accepts JPG/PNG
  * Cloudinary integration

### 📃 Employee Listing

* Pagination
* Sorting (Name, Email, ID, Date)
* Filtering + Search
* Edit/Delete with confirmation
* Status Toggle (Active/Inactive)

---

## 📸 Screens Overview

* **Login Page** – With validation and alerts
* **Dashboard** – Welcome Admin, logout, and session handling
* **Employee List** – Paginated table with search/filter/sort
* **Create/Edit Employee** – Fully validated form with image upload

---

## ⚙️ Installation

### Backend Setup

```bash
cd lifelinkr_assignment
npm install
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `lifelinkr_assignment` folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

---

## 🔮 Future Enhancements

* Unit & Integration Testing
* Role-Based Access Control (Admin/HR)
* Advanced charts and analytics with Recharts
* Export Employee List as CSV/PDF

---

## 👨‍💻 Author

**Aqib**
*This panel is a test assignment to demonstrate MERN skills with real-time validations and full-stack integrations.*

---

## 📜 License

This project is licensed under the ISC License.
