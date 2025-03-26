const Department = require('../models/Department');

exports.getAllDepartments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await Department.findAll(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching departments', 
            error: error.message 
        });
    }
};
