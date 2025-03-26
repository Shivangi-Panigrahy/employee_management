Employee Management System
:clipboard: Overview
The Employee Management System is a modern, full-stack web application designed to help organizations efficiently manage their workforce. Built with React, Redux, and a backend API, this system provides comprehensive employee management and insightful workforce analytics.
:sparkles: Features
Employee Management
Add, edit, and delete employee records
Detailed employee information tracking
Pagination support for employee lists
Department Management
View and manage department information
Department-based employee categorization
Analytics Dashboard
Visualize key workforce statistics
Insights into salary distributions
Youngest employees by department analysis
:rocket: Technologies Used
Frontend
React.js
Redux Toolkit
React Router
Tailwind CSS
Recharts (for data visualization)
Axios (HTTP requests)
Sonner (Toast notifications)
Backend
Node.js
Express.js
MySQL Database
Raw SQL Queries
:package: Prerequisites
Node.js (v16 or later)
npm or Yarn
MySQL Database
Backend API running
:wrench: Installation
Backend Setup
Clone the repository
git clone https://github.com/Shivangi-Panigrahy/employee_management.git
cd employee_management/server
Install dependencies
npm install
Set up environment variables Create a .env file in the server directory:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456789
DB_NAME=employee_management
DB_PORT=3306

PORT=8000
Run Database Migrations
npm run migrate
Start the backend server
npm start
Frontend Setup
Navigate to client directory
cd ../client
Install dependencies
npm install
Set up environment variables Create a .env file in the client directory:
VITE_API_URL=http://localhost:8000/api/
Run the frontend application
npm run dev
:open_file_folder: Project Structure
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
:desktop_computer: Pages
Employees Page
Add/Edit Employee Form
Employee List with Pagination
Quick Actions (Edit/Delete)
Statistics Page
Department Salary Insights
Salary Range Distribution
Youngest Employees Visualization
:star2: Key Components
EmployeeForm: Comprehensive form for employee data entry
EmployeeTable: Paginated employee list with actions
Statistics: Data visualization and insights
Layout: Responsive application layout with sidebar
:card_file_box: Database Migration
The project uses custom migration scripts:
npm run migrate: Runs database migrations
Ensures consistent database schema across different environments
:lock: Environment Configuration
Backend Environment Variables:
DB_HOST: Database host
DB_USER: Database username
DB_PASSWORD: Database password
DB_NAME: Database name
DB_PORT: Database port
PORT: Server port
Frontend Environment Variables:
VITE_API_URL: Backend API base URL

:page_facing_up: License
Distributed under the MIT License. See LICENSE for more information.
:telephone_receiver: Contact
Shivangi Panigrahy
GitHub: @Shivangi-Panigrahy
Project Link: https://github.com/Shivangi-Panigrahy/employee_management
:pray: Acknowledgements
React.js
Redux Toolkit
Tailwind CSS
Recharts
Axios
Sonner

Note: Ensure MySQL database is set up and migrations are run before starting the application.
