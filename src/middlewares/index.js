const express = require("express");
const morgan = require("morgan");
const { NODE_ENV } = require("../utils/config.util");
const { envs } = require("../utils/enums.util");

module.exports = app => {
    app.use(express.json());
    if (NODE_ENV !== envs.testing) {
        app.use(morgan("dev"));
    }
}