const { response, NotFoundError } = require("../utils/response.util");

const unknownRoute = (req, res) => {
    // return res.redirect("/api/v1/docs");
    const err = new NotFoundError("Route not found");
    return response(res, err.message, err.data, err.status, false, true);
};

const errorHandler = (err, req, res, next) => {
    return response(res, err.message, err.data, err.status, false, true);
};

module.exports = {
    unknownRoute,
    errorHandler
};
