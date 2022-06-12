const userRouter = require("express").Router();
const { validateId, validate } = require("../middlewares/validate.middleware");
const { UserCreateSchema, UserUpdateSchema } = require("../models/user.model");
const {
    authenticate,
    loggedUserOrAdmin,
    admin,
    rolePermission
} = require("../middlewares/authorization.middleware");
const {
    createUser,
    updateOneUser,
    getAllUsers,
    getOneUser,
    deleteUser
} = require("./../controllers/user.controller");

userRouter
    .route("/")
    .post([validate(UserCreateSchema)], createUser)
    .get([authenticate, admin], getAllUsers);

userRouter
    .route("/:id")
    .all(validateId)
    .patch(
        [
            validate(UserUpdateSchema),
            authenticate,
            loggedUserOrAdmin,
            rolePermission
        ],
        updateOneUser
    )
    .get(getOneUser)
    .delete([authenticate, loggedUserOrAdmin], deleteUser);

module.exports = userRouter;
