const { authenticate } = require("../middlewares/authorization.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { LoginSchema } = require("../models/auth.model");
const authService = require("./../services/auth.service");
const authRouter = require("express").Router();

const loginUser = async (req, res, next) => {
    try {
        const user = await authService.getOneEmail(req.body.email);
        await authService.comparePassword(req.body.password, user.password);
        const token = await authService.generateToken(user);
        res.status(200).send({ token });
    } catch (err) {
        return next(err);
    }
};

const updateToken = async (req, res, next) => {
    try {
        const token = await authService.generateToken(req.user);
        res.status(200).send({ token });
    } catch (err) {
        return next(err);
    }
};

authRouter
    .route("/")
    .post([validate(LoginSchema)], loginUser)
    .patch([authenticate], updateToken);

module.exports = authRouter;