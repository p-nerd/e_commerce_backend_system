const userRouter = require("./controllers/users.controller");
const router = require("express").Router();

router.use("/users", userRouter);

module.exports = router;