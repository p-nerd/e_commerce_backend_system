const { response } = require("../utils/response.util");
const authService = require("./../services/auth.service");
const { authenticate } = require("../middlewares/authorization.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { LoginSchema } = require("../models/auth.model");
const authRouter = require("express").Router();


const loginUser = async (req, res, next) => {
    try {
        const user = await authService.getOneEmail(req.body.email);
        await authService.comparePassword(req.body.password, user.password);
        const access_token = await authService.generateToken(user);
        return response(res, "Jwt access token", { access_token });
    } catch (err) {
        return next(err);
    }
};

const updateToken = async (req, res, next) => {
    try {
        const access_token = await authService.generateToken(req.user);
        return response(res, "Updated Jwt access token", { access_token });
    } catch (err) {
        return next(err);
    }
};

authRouter
    .route("/")
    .post([validate(LoginSchema)], loginUser)
    .patch([authenticate], updateToken);

module.exports = authRouter;
