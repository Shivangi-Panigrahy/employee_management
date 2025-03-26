const express = require('express');
const router = express.Router();
const { 
    getDepartmentHighestSalary,
    getSalaryRangeCount,
    getYoungestEmployeeByDepartment
} = require('../controllers/statsController');

router.get('/department-highest-salary', getDepartmentHighestSalary);
router.get('/salary-range', getSalaryRangeCount);
router.get('/youngest-employees', getYoungestEmployeeByDepartment);

module.exports = router;
