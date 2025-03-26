const db = require('../config/database');

class Employee {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.department_id = data.department_id;
        this.dob = data.dob;
        this.phone = data.phone;
        this.email = data.email;
        this.salary = data.salary;
        this.photo = data.photo;
        this.status = data.status || 'active';
    }

    static async create(employeeData) {
        try {
            const [result] = await db.query(
                'INSERT INTO employees (name, department_id, dob, phone, email, salary, photo) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [
                    employeeData.name, 
                    employeeData.department_id, 
                    employeeData.dob, 
                    employeeData.phone, 
                    employeeData.email, 
                    employeeData.salary, 
                    employeeData.photo
                ]
            );
            return result.insertId;
        } catch (error) {
            throw new Error(`Error creating employee: ${error.message}`);
        }
    }

    static async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        try {
            const [countResult] = await db.query('SELECT COUNT(*) as total FROM employees');
            const total = countResult[0].total;

            const [employees] = await db.query(`
                SELECT e.*, d.name as department_name 
                FROM employees e
                JOIN departments d ON e.department_id = d.id
                LIMIT ? OFFSET ?
            `, [limit, offset]);

            return {
                employees: employees.map(emp => new Employee(emp)),
                totalPages: Math.ceil(total / limit),
                currentPage: page
            };
        } catch (error) {
            throw new Error(`Error fetching employees: ${error.message}`);
        }
    }
    static async update(id, employeeData) {
        try {
            await db.query(
                'UPDATE employees SET name=?, department_id=?, dob=?, phone=?, email=?, salary=?, photo=? WHERE id=?',
                [
                    employeeData.name, 
                    employeeData.department_id, 
                    employeeData.dob, 
                    employeeData.phone, 
                    employeeData.email, 
                    employeeData.salary, 
                    employeeData.photo, 
                    id
                ]
            );
            return true;
        } catch (error) {
            throw new Error(`Error updating employee: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            await db.query('DELETE FROM employees WHERE id=?', [id]);
            return true;
        } catch (error) {
            throw new Error(`Error deleting employee: ${error.message}`);
        }
    }

    static async getDepartmentHighestSalary() {
        try {
            const [results] = await db.query(`
                SELECT d.name as department, MAX(e.salary) as highest_salary
                FROM departments d
                LEFT JOIN employees e ON d.id = e.department_id
                GROUP BY d.id, d.name
            `);
            return results;
        } catch (error) {
            throw new Error(`Error fetching department highest salaries: ${error.message}`);
        }
    }

    static async getSalaryRangeCount() {
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
            return results;
        } catch (error) {
            throw new Error(`Error fetching salary range count: ${error.message}`);
        }
    }

    static async getYoungestEmployeeByDepartment() {
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
            return results;
        } catch (error) {
            throw new Error(`Error fetching youngest employees: ${error.message}`);
        }
    }
}

module.exports = Employee;