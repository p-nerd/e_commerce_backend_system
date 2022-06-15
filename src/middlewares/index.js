const express = require("express");
const morgan = require("morgan");
const { NODE_ENV, BASE_URL } = require("../utils/config");
const { envs } = require("../utils/enums");
const { setCorrelationId, requestLogger } = require("./logging");
const swaggerConfig = require("./swagger");

module.exports = (app) => {
    app.use(express.json());
    app.use(BASE_URL + "/docs", swaggerConfig());

    app.use(setCorrelationId);
    if (NODE_ENV !== envs.testing) {
        app.use(requestLogger());
        app.use(morgan("dev"));
    }
};
