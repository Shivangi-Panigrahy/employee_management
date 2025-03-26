const db = require('../config/database');

class Department {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.status = data.status || 'active';
        this.created = data.created;
        this.modified = data.modified;
    }

    static async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        try {
            const [countResult] = await db.query('SELECT COUNT(*) as total FROM departments');
            const total = countResult[0].total;

            const [departments] = await db.query(`
                SELECT * FROM departments 
                WHERE status = 'active'
                LIMIT ? OFFSET ?
            `, [limit, offset]);

            return {
                departments: departments.map(dept => new Department(dept)),
                totalPages: Math.ceil(total / limit),
                currentPage: page
            };
        } catch (error) {
            throw new Error(`Error fetching departments: ${error.message}`);
        }
    }
}

module.exports = Department;