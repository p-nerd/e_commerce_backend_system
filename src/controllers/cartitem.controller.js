const cartitemRouter = require("express").Router();

const createCartitem = async (req, res, next) => {
};

cartitemRouter
    .route("/")
    .post(createCartitem);

module.exports = {
    cartitemRouter,
}