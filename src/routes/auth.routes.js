const authRouter = require("express").Router();
const { authenticate } = require("../middlewares/authorization.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { LoginSchema } = require("../models/auth.model");
const { loginUser, updateToken } = require("./../controllers/auth.controller");

authRouter
    .route("/")
    .post([validate(LoginSchema)], loginUser)
    .patch([authenticate], updateToken);

module.exports = authRouter;
