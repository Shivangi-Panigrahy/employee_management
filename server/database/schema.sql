

-- Create Departments Table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Employees Table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    photo VARCHAR(255),
    email VARCHAR(100) UNIQUE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Insert Initial Departments
INSERT INTO departments (name) VALUES 
('IT'),
('Human Resources'),
('Finance'),
('Marketing'),
('Sales'),
('Customer Support');

-- Insert Sample Employees
INSERT INTO employees (
    department_id, 
    name, 
    dob, 
    phone, 
    email, 
    salary, 
    photo
) VALUES 
(1, 'John Doe', '1990-05-15', '1234567890', 'john.doe@example.com', 75000, NULL),
(2, 'Jane Smith', '1988-08-22', '9876543210', 'jane.smith@example.com', 65000, NULL),
(3, 'Mike Johnson', '1985-03-10', '5555555555', 'mike.johnson@example.com', 85000, NULL),
(4, 'Emily Brown', '1992-11-30', '7777777777', 'emily.brown@example.com', 60000, NULL),
(5, 'David Wilson', '1987-06-25', '4444444444', 'david.wilson@example.com', 70000, NULL),
(6, 'Sophia Martinez', '1995-07-19', '6666666666', 'sophia.martinez@example.com', 72000, NULL),
(1, 'Daniel Lee', '1993-02-14', '3333333333', 'daniel.lee@example.com', 120000, NULL),
(2, 'Olivia Taylor', '1991-09-08', '2222222222', 'olivia.taylor@example.com', 68000, NULL),
(3, 'Ethan Clark', '1989-12-01', '9999999999', 'ethan.clark@example.com', 90000, NULL),
(4, 'Ava White', '1994-04-05', '8888888888', 'ava.white@example.com', 75000, NULL),
(5, 'Noah Harris', '1996-03-21', '7771234567', 'noah.harris@example.com', 65000, NULL),
(6, 'Liam Young', '1983-10-10', '5556781234', 'liam.young@example.com', 95000, NULL),
(1, 'Emma King', '1986-07-07', '4445678901', 'emma.king@example.com', 88000, NULL),
(2, 'William Scott', '1982-11-15', '3334567890', 'william.scott@example.com', 98000, NULL),
(3, 'Charlotte Green', '1997-08-25', '2223456789', 'charlotte.green@example.com', 62000, NULL);


-- Create View for Employee Statistics
CREATE VIEW employee_stats AS
SELECT 
    d.name AS department,
    COUNT(e.id) AS total_employees,
    AVG(e.salary) AS average_salary,
    MAX(e.salary) AS max_salary,
    MIN(e.salary) AS min_salary
FROM 
    departments d
LEFT JOIN 
    employees e ON d.id = e.department_id
GROUP BY 
    d.id, d.name;

-- Stored Procedure for Employee Salary Range Count
DELIMITER //
CREATE PROCEDURE GetSalaryRangeCount()
BEGIN
    SELECT 
        CASE 
            WHEN salary BETWEEN 0 AND 50000 THEN '0-50000'
            WHEN salary BETWEEN 50001 AND 100000 THEN '50001-100000'
            ELSE '100000+'
        END as salary_range,
        COUNT(*) as employee_count
    FROM employees
    GROUP BY salary_range
    ORDER BY salary_range;
END //

CREATE PROCEDURE GetYoungestEmployeesByDepartment()
BEGIN
    SELECT 
        d.name as department, 
        e.name, 
        TIMESTAMPDIFF(YEAR, e.dob, CURDATE()) as age
    FROM (
        SELECT 
            department_id, 
            MIN(dob) as youngest_dob
        FROM employees
        GROUP BY department_id
    ) youngest
    JOIN employees e ON e.department_id = youngest.department_id AND e.dob = youngest.youngest_dob
    JOIN departments d ON d.id = e.department_id;
END //

DELIMITER ;