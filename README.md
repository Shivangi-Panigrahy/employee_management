# Employee Management System

## 📋 Overview

The Employee Management System is a modern, full-stack web application designed to help organizations efficiently manage their workforce. Built with React, Redux, and a backend API, this system provides comprehensive employee management and insightful workforce analytics.

## ✨ Features

### Employee Management
- Add, edit, and delete employee records
- Detailed employee information tracking
- Pagination support for employee lists

### Department Management
- View and manage department information
- Department-based employee categorization

### Analytics Dashboard
- Visualize key workforce statistics
- Insights into salary distributions
- Youngest employees by department analysis

## 🚀 Technologies Used

### Frontend
- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Recharts (for data visualization)
- Axios (HTTP requests)
- Sonner (Toast notifications)

### Backend
- Node.js
- Express.js
- MySQL
- Direct SQL Queries (No ORM)

## 📦 Prerequisites

- Node.js (v16 or later)
- npm or Yarn
- MySQL Database

## 🔧 Installation

### Backend Setup
1. Navigate to server directory
```bash
cd server
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the server directory:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456789
DB_NAME=employee_management
DB_PORT=3306

PORT=8000
```

4. Run database migrations
```bash
npm run migrate
```

5. Start the backend server
```bash
npm run dev
```

### Frontend Setup
1. Navigate to client directory
```bash
cd client
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the client directory:
```
VITE_API_URL=http://localhost:8000/api/
```

4. Run the frontend application
```bash
npm run dev
```

## 📂 Project Structure
```
employee_management/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── migrations/
│   │   └── database/
│   └── .env
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   └── routes/
    └── .env
```

## 🖥️ Pages

### Employees Page
- Add/Edit Employee Form
- Employee List with Pagination
- Quick Actions (Edit/Delete)

### Statistics Page
- Department Salary Insights
- Salary Range Distribution
- Youngest Employees Visualization

## 🌟 Quick Start

To set up and run the entire project:
```bash
# Clone the repository
git clone https://github.com/Shivangi-Panigrahy/employee_management.git

# Set up backend
cd employee_management/server
npm install
npm run migrate
npm run dev

# In another terminal, set up frontend
cd ../client
npm install
npm run dev
```

## 🔒 Environment Configuration

Backend Environment Variables:
- `DB_HOST`: Database host
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `DB_PORT`: Database port
- `PORT`: Server port

Frontend Environment Variables:
- `VITE_API_URL`: Base URL for API requests


## 🙏 Acknowledgements

- React.js
- Redux Toolkit
- Express.js
- MySQL
- Tailwind CSS

---

**Note**: Ensure MySQL database is set up and running before starting the backend server.
