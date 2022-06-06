const userRouter = require("express").Router();
const profileService = require("../services/profile.service");
const userService = require("./../services/user.service");
const { validateId, validate } = require("../middlewares/validate.middleware");
const { UserCreateSchema, UserUpdateSchema } = require("../models/user.model");
const { authenticate, loggedUserOrAdmin, admin, rolePermission } = require("../middlewares/authorization.middleware");
const cryptoService = require("../services/crypto.service");

const createUser = async (req, res, next) => {
    try {
        req.body.password = await cryptoService.hash(req.body.password);
        const savedUser = await userService.saveOne(req.body);
        return res.status(201).send(savedUser);
    } catch (err) {
        return next(err);
    }
};

const updateOneUser = async (req, res, next) => {
    try {
        await userService.giveOne(req.params.id);
        const updatedData = await userService.updateOne(req.params.id, req.body);
        return res.status(200).send(updatedData);
    } catch (err) {
        return next(err);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userService.giveMany();
        return res.status(200).send(allUsers);
    } catch (err) {
        return next(err);
    }
}

const getOneUser = async (req, res, next) => {
    try {
        const user = await userService.giveOne(req.params.id);
        return res.status(200).send(user);
    } catch (err) {
        return next(err);
    }
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        await profileService.getOneByUserId(userId);
        await profileService.deleteOneByUserId(userId);
    } catch (err) { }
    try {
        await userService.deleteOne(userId);
        return res.status(200).send("user delete successfully");
    } catch (err) {
        return next(err);
    }
}

userRouter
    .route("/")
    .post([validate(UserCreateSchema)], createUser)
    .get([authenticate, admin], getAllUsers);

userRouter
    .route("/:id")
    .all(validateId)
    .patch([validate(UserUpdateSchema), authenticate, loggedUserOrAdmin, rolePermission], updateOneUser)
    .get(getOneUser)
    .delete([authenticate, loggedUserOrAdmin], deleteUser)

module.exports = userRouter;