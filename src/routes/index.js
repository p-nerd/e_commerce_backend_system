const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const cartitemRouter = require("./cartitem.routes");
const categoryRouter = require("./category.routes");
const productRouter = require("./product.routes");
const profileRouter = require("./profile.routes");
const swagger = require("../utils/swagger.util");
const {
    unknownRoute,
    errorHandler
} = require("../middlewares/errors.middleware");
const { errorLogger } = require("../middlewares/logging.middleware");
const { NODE_ENV } = require("../utils/config.util");
const { envs } = require("../utils/enums.util");

module.exports = (app) => {
    const base = "/api/v1";
    app.use(base + "/users", userRouter);
    app.use(base + "/auths", authRouter);
    app.use(base + "/profiles", profileRouter);
    app.use(base + "/categories", categoryRouter);
    app.use(base + "/products", productRouter);
    app.use(base + "/cartitems", cartitemRouter);
    app.use(base + "/docs", swagger);

    if (NODE_ENV !== envs.testing) {
        app.use(errorLogger());
    }
    app.use(errorHandler);
    app.use(unknownRoute);
};
