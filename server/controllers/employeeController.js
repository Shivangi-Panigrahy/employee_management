const Employee = require('../models/Employee');
const { validateEmployee } = require('../utils/validation');

exports.getAllEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await Employee.findAll(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching employees', 
            error: error.message 
        });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const { isValid, errors } = validateEmployee(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const employeeId = await Employee.create(req.body);
        res.status(201).json({ 
            message: 'Employee created successfully', 
            id: employeeId 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating employee', 
            error: error.message 
        });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const { isValid, errors } = validateEmployee(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        await Employee.update(id, req.body);
        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating employee', 
            error: error.message 
        });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.delete(id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting employee', 
            error: error.message 
        });
    }
};
