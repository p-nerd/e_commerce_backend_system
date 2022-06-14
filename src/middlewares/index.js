const express = require("express");
const morgan = require("morgan");
const { NODE_ENV, BASE_URL } = require("../utils/config.util");
const { envs } = require("../utils/enums.util");
const { setCorrelationId, requestLogger } = require("./logging.middleware");
const swaggerConfig = require("../middlewares/swagger.middleware");

module.exports = (app) => {
    app.use(express.json());
    app.use(BASE_URL + "/docs", swaggerConfig());

    app.use(setCorrelationId);
    if (NODE_ENV !== envs.testing) {
        app.use(requestLogger());
        app.use(morgan("dev"));
    }
};
