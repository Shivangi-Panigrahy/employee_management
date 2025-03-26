const express = require('express');
const router = express.Router();
const { 
    getAllEmployees, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
} = require('../controllers/employeeController');
const { validateEmployeeMiddleware } = require('../middleware/validationMiddleware');

router.get('/', getAllEmployees);
router.post('/', validateEmployeeMiddleware, createEmployee);
router.put('/:id', validateEmployeeMiddleware, updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;