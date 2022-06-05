const authRouter = require("./controllers/auth.controller");
const cartitemRouter = require("./controllers/cartitem.controller");
const categoryRouter = require("./controllers/category.controller");
const productRouter = require("./controllers/product.controller");
const profileRouter = require("./controllers/profile.controller");
const userRouter = require("./controllers/user.controller");
const router = require("express").Router();

router.use("/users", userRouter);
router.use("/auths", authRouter);
router.use("/profiles", profileRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/cartitems", cartitemRouter)

module.exports = router;