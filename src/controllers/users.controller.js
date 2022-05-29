const userRouter = require("express").Router();
const userService = require("./../services/user.service");

const createUser = async (req, res, next) => {
    try {
        const savedUser = await userService.save(req.body);
        return res.status(201).send(savedUser);
    } catch (err) {
        return next(err);
    }
}

userRouter
    .route("/")
    .post(createUser)
// .get(getAllUsers);

// userRouter
//     .route("/:id")
//     .get(getOneUser)
//     .patch(updateOneUser)
//     .delete(deleteOneUser)

module.exports = userRouter;