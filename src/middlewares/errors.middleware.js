const { NotFoundError } = require("../utils/errors.util");

const unknownRoute = (req, res) => {
    res.status(404).send(new NotFoundError("Resource not found"));
};

const errorHandler = (err, req, res, next) => {
    res.status(err.status).send(err);
}

module.exports = {
    unknownRoute,
    errorHandler
}