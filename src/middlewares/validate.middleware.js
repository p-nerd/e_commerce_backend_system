const {
    RequestValidationError,
    NotFoundError
} = require("../utils/response.util");

const concatErrorsDetails = (details) =>
    details.reduce((total, current) => total + current.message, "");

const validate = (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
        const errorMessages = concatErrorsDetails(result.error.details);
        return next(new RequestValidationError(errorMessages));
    }
    req.body = result.value;
    return next();
};

const validateId = (req, res, next) => {
    if (req.params.id.length !== 24)
        return next(new NotFoundError("user not found by the id"));
    return next();
};

module.exports = {
    validateId,
    validate
};
