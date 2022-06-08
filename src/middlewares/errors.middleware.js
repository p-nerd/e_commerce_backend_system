const unknownRoute = (req, res) => {
    return res.redirect("/api/v1/docs");
};

const errorHandler = (err, req, res, next) => {
    return res.status(err.status).send(err);
}

module.exports = {
    unknownRoute,
    errorHandler
}