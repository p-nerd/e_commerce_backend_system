const userRouter = require("express").Router();
const { validateId, validateJoiSchema } = require("../middlewares/validate");
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
        const id = req.params.id;
        const payload = req.body;
        const updatedData = await userService.update(id, payload);
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

const getOneUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.giveOne(id);
        return res.status(200).send(user);
    } catch (err) {
        return next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await userService.deleteOne(id);
        return res.status(200).send("user delete successfully");
    } catch (err) {
        return next(err);
    }
}

userRouter
    .route("/")
    .post([validateJoiSchema(UserCreateSchema)], createUser)
    .get(getAllUsers);

userRouter
    .route("/:id")
    .all(validateId)
    .patch([validateJoiSchema(UserUpdateSchema)], updateOneUser)
    .get(getOneUser)
    .delete(deleteUser)

module.exports = userRouter;