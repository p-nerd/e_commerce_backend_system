const authRouter = require("./auth.controller");
const cartitemRouter = require("./cartitem.controller");
const categoryRouter = require("./category.controller");
const productRouter = require("./product.controller");
const profileRouter = require("./profile.controller");
const userRouter = require("./user.controller");
const swagger = require("../utils/swagger.util");
const { unknownRoute, errorHandler } = require("../middlewares/errors.middleware");
const { errorLogger } = require("../middlewares/logging.middleware");

module.exports = app => {
    const base = "/api/v1";
    app.use(base + "/users", userRouter);
    app.use(base + "/auths", authRouter);
    app.use(base + "/profiles", profileRouter);
    app.use(base + "/categories", categoryRouter);
    app.use(base + "/products", productRouter);
    app.use(base + "/cartitems", cartitemRouter)
    app.use(base + "/docs", swagger)

    app.use(errorLogger());
    app.use(errorHandler);
    app.use(unknownRoute);
};
