const db = require('../config/database');

// Get Department-wise Highest Salaries
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

// Get Salary Range Distribution
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

// Get Youngest Employees by Department
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

// Get Overall Employee Statistics
exports.getOverallEmployeeStats = async (req, res) => {
    try {
        const [totalEmployees] = await db.query(`
            SELECT COUNT(*) as total_count FROM employees
        `);

        const [averageSalary] = await db.query(`
            SELECT AVG(salary) as avg_salary FROM employees
        `);

        const [departmentStats] = await db.query(`
            SELECT 
                d.name as department,
                COUNT(e.id) as employee_count,
                ROUND(AVG(e.salary), 2) as avg_department_salary
            FROM departments d
            LEFT JOIN employees e ON d.id = e.department_id
            GROUP BY d.id, d.name
            ORDER BY employee_count DESC
        `);

        res.json({
            total_employees: totalEmployees[0].total_count,
            average_salary: averageSalary[0].avg_salary,
            department_stats: departmentStats
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching overall employee statistics', 
            error: error.message 
        });
    }
};

// Get Salary Distribution by Age Group
exports.getSalaryByAgeGroup = async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT 
                CASE 
                    WHEN TIMESTAMPDIFF(YEAR, dob, CURDATE()) < 25 THEN '18-24'
                    WHEN TIMESTAMPDIFF(YEAR, dob, CURDATE()) BETWEEN 25 AND 34 THEN '25-34'
                    WHEN TIMESTAMPDIFF(YEAR, dob, CURDATE()) BETWEEN 35 AND 44 THEN '35-44'
                    WHEN TIMESTAMPDIFF(YEAR, dob, CURDATE()) BETWEEN 45 AND 54 THEN '45-54'
                    ELSE '55+'
                END as age_group,
                ROUND(AVG(salary), 2) as average_salary,
                COUNT(*) as employee_count
            FROM employees
            GROUP BY age_group
            ORDER BY 
                CASE age_group
                    WHEN '18-24' THEN 1
                    WHEN '25-34' THEN 2
                    WHEN '35-44' THEN 3
                    WHEN '45-54' THEN 4
                    ELSE 5
                END
        `);
        
        res.json(results);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching salary by age group', 
            error: error.message 
        });
    }
};

// Export Detailed Report
exports.exportDetailedReport = async (req, res) => {
    try {
        const [report] = await db.query(`
            SELECT 
                e.id,
                e.name,
                d.name as department,
                e.email,
                e.salary,
                TIMESTAMPDIFF(YEAR, e.dob, CURDATE()) as age,
                e.status
            FROM employees e
            JOIN departments d ON e.department_id = d.id
            ORDER BY e.salary DESC
        `);
        
        res.json(report);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error generating detailed report', 
            error: error.message 
        });
    }
};