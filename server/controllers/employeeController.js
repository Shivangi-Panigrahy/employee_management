const db = require('../config/database');

exports.getAllEmployees = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        // Get total count
        const [countResult] = await db.query('SELECT COUNT(*) as total FROM employees');
        const total = countResult[0].total;

        // Get paginated employees
        const [employees] = await db.query(`
            SELECT e.*, d.name as department_name 
            FROM employees e
            JOIN departments d ON e.department_id = d.id
            LIMIT ? OFFSET ?
        `, [limit, offset]);

        res.json({
            employees,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
};

exports.createEmployee = async (req, res) => {
    const { name, department_id, dob, phone, email, salary, photo } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO employees (name, department_id, dob, phone, email, salary, photo) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, department_id, dob, phone, email, salary, photo]
        );

        res.status(201).json({ 
            message: 'Employee created successfully', 
            id: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, department_id, dob, phone, email, salary, photo } = req.body;

    try {
        await db.query(
            'UPDATE employees SET name=?, department_id=?, dob=?, phone=?, email=?, salary=?, photo=? WHERE id=?',
            [name, department_id, dob, phone, email, salary, photo, id]
        );

        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM employees WHERE id=?', [id]);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
};

exports.getDepartmentHighestSalary = async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT d.name as department, MAX(e.salary) as highest_salary
            FROM departments d
            LEFT JOIN employees e ON d.id = e.department_id
            GROUP BY d.id, d.name
        `);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching department highest salaries', error: error.message });
    }
};

exports.getSalaryRangeCount = async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT 
                CASE 
                    WHEN salary BETWEEN 0 AND 50000 THEN '0-50000'
                    WHEN salary BETWEEN 50001 AND 100000 THEN '50001-100000'
                    ELSE '100000+'
                END as salary_range,
                COUNT(*) as employee_count
            FROM employees
            GROUP BY salary_range
            ORDER BY salary_range
        `);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching salary range count', error: error.message });
    }
};

exports.getYoungestEmployeeByDepartment = async (req, res) => {
    try {
        const [results] = await db.query(`
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
            JOIN departments d ON d.id = e.department_id
        `);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching youngest employees', error: error.message });
    }
};