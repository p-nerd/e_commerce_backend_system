const { validateJoiSchema } = require("../middlewares/validate");
const { LoginSchema } = require("../models/auth.model");
const authService = require("./../services/auth.service");
const authRouter = require("express").Router();

const loginUser = async (req, res, next) => {
    try {
        const payload = req.body;
        const user = await authService.giveOneEmail(payload.email);
        await authService.comparePassword(payload.password, user.password);
        const token = await authService.generateToken(user);
        res.status(200).send(token);
    } catch (err) {
        return next(err);
    }
};

authRouter.post("/login", [validateJoiSchema(LoginSchema)], loginUser);

module.exports = authRouter;