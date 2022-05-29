const { RequestValidationError } = require("../utils/errors.util");

const concatErrorsDetails = (details) =>
    details.reduce((total, current) =>
        total + current.message, "");

module.exports = (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
        const errorMessages = concatErrorsDetails(result.error.details);
        return next(new RequestValidationError(errorMessages));
    }
    req.body = result.value;
    return next();
}