const db = require('../config/database');

exports.getDepartmentHighestSalary = async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT 
                d.name as department, 
                MAX(e.salary) as highest_salary
            FROM departments d
            LEFT JOIN employees e ON d.id = e.department_id
            GROUP BY d.id, d.name
            ORDER BY highest_salary DESC
        `);
        
        res.json(results);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching department highest salaries', 
            error: error.message 
        });
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
            ORDER BY 
                CASE salary_range
                    WHEN '0-50000' THEN 1
                    WHEN '50001-100000' THEN 2
                    ELSE 3
                END
        `);
        
        res.json(results);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching salary range distribution', 
            error: error.message 
        });
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
            JOIN employees e ON e.department_id = youngest.department_id 
                AND e.dob = youngest.youngest_dob
            JOIN departments d ON d.id = e.department_id
        `);
        
        res.json(results);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching youngest employees', 
            error: error.message 
        });
    }
};