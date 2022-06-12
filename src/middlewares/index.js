const express = require("express");
const morgan = require("morgan");
const { NODE_ENV } = require("../utils/config.util");
const { envs } = require("../utils/enums.util");
const { setCorrelationId, requestLogger } = require("./logging.middleware");

module.exports = (app) => {
    app.use(express.json());
    app.use(setCorrelationId);
    if (NODE_ENV !== envs.testing) {
        app.use(requestLogger());
        app.use(morgan("dev"));
    }
};
