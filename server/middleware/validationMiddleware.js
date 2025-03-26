const { validateEmployee } = require('../utils/validation');

const validateEmployeeMiddleware = (req, res, next) => {
    const { isValid, errors } = validateEmployee(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    next();
};

module.exports = {
    validateEmployeeMiddleware
};