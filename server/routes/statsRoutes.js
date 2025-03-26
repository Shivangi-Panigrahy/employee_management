// const express = require('express');
// const router = express.Router();
// const { 
//     getDepartmentHighestSalary, 
//     getSalaryRangeCount,
//     getYoungestEmployeeByDepartment 
// } = require('../controllers/statsController');

// router.get('/highest-salary', getDepartmentHighestSalary);
// router.get('/salary-range', getSalaryRangeCount);
// router.get('/youngest-employees', getYoungestEmployeeByDepartment);

// module.exports = router;
const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Department Highest Salary Route
router.get('/department-highest-salary', statsController.getDepartmentHighestSalary);

// Salary Range Distribution Route
router.get('/salary-range', statsController.getSalaryRangeCount);

// Youngest Employees by Department Route
router.get('/youngest-employees', statsController.getYoungestEmployeeByDepartment);

// Overall Employee Statistics Route
router.get('/overall-stats', statsController.getOverallEmployeeStats);

// Salary by Age Group Route
router.get('/salary-by-age-group', statsController.getSalaryByAgeGroup);

// Detailed Report Export Route
router.get('/export-report', statsController.exportDetailedReport);

module.exports = router;
