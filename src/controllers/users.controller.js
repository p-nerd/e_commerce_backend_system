const userRouter = require("express").Router();
const validate = require("../middlewares/validate");
const { UserCreateSchema } = require("../models/user.model");
const userService = require("./../services/user.service");
const crypto = require("./../utils/crypto.util");

const createUser = async (req, res, next) => {
    try {
        req.body.password = await crypto.hash(req.body.password);
        const savedUser = await userService.save(req.body);
        return res.status(201).send(savedUser);
    } catch (err) {
        return next(err);
    }
}

userRouter
    .route("/")
    .post([validate(UserCreateSchema)], createUser)
// .get(getAllUsers);

// userRouter
//     .route("/:id")
//     .get(getOneUser)
//     .patch(updateOneUser)
//     .delete(deleteOneUser)

module.exports = userRouter;