const userRouter = require("./user.controller");
const authRouter = require("./auth.controller");
const cartitemRouter = require("./cartitem.controller");
const categoryRouter = require("./category.controller");
const productRouter = require("./product.controller");
const profileRouter = require("./profile.controller");
const {
    unknownRoute,
    errorHandler
} = require("../middlewares/errors");
const { errorLogger } = require("../middlewares/logging");
const { NODE_ENV, BASE_API_PATH } = require("../utils/config");
const { envs } = require("../utils/enums");

module.exports = async (app) => {
    const base = BASE_API_PATH;
    app.use(base + "/users", userRouter);
    app.use(base + "/auths", authRouter);
    app.use(base + "/profiles", profileRouter);
    app.use(base + "/categories", categoryRouter);
    app.use(base + "/products", productRouter);
    app.use(base + "/cartitems", cartitemRouter);
    if (NODE_ENV !== envs.testing) {
        app.use(errorLogger());
    }
    app.use(errorHandler);
    app.use(unknownRoute);
};
