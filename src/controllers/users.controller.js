const userRouter = require("express").Router();
const validate = require("../middlewares/validate");
const { UserCreateSchema, UserUpdateSchema } = require("../models/user.model");
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
};

const updateOneUser = async (req, res, next) => {
    try {
        const updatedData = await userService.update(req.params.id, req.body);
        return res.status(200).send(updatedData);
    } catch (err) {
        return next(err);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userService.giveAll();
        return res.status(200).send(allUsers);
    } catch (err) {
        return next(err);
    }
}

userRouter
    .route("/")
    .post([validate(UserCreateSchema)], createUser)
    .get(getAllUsers);

userRouter
    .route("/:id")
    .patch([validate(UserUpdateSchema)], updateOneUser)
// .get(getOneUser)
// .delete(deleteOneUser)

module.exports = userRouter;