const validator = require('validator');

const validateEmployee = (data) => {
    const errors = {};

    // Name validation
    if (!data.name || validator.isEmpty(data.name.trim())) {
        errors.name = 'Name is required';
    }

    // Email validation
    if (!data.email || !validator.isEmail(data.email)) {
        errors.email = 'Valid email is required';
    }

    // Phone validation
    if (data.phone && !validator.isMobilePhone(data.phone, 'any')) {
        errors.phone = 'Invalid phone number';
    }

    // Date of Birth validation
    if (!data.dob || !validator.isDate(data.dob)) {
        errors.dob = 'Valid date of birth is required';
    }

    // Salary validation
    if (!data.salary || isNaN(parseFloat(data.salary)) || parseFloat(data.salary) < 0) {
        errors.salary = 'Valid salary is required';
    }

    // Department validation
    if (!data.department_id || isNaN(parseInt(data.department_id))) {
        errors.department_id = 'Valid department is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateEmployee
};