const authRouter = require("./controllers/auth.controller");
const profileRouter = require("./controllers/profile.controller");
const userRouter = require("./controllers/users.controller");
const router = require("express").Router();

router.use("/users", userRouter);
router.use("/auths", authRouter);
router.use("/profiles", profileRouter);

module.exports = router;