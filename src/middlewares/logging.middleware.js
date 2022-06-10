const expressWinston = require("express-winston");
const winston = require("winston");
const { MONGODB_URI } = require("../utils/config.util");
require('winston-mongodb');

const consoleTransport = () => new winston.transports.Console({
    json: true,
    colorize: true
});

const mongodbTransport = () => new winston.transports.MongoDB({
    db: MONGODB_URI,
    metaKey: "meta",
    collection: "logs",
});

const format = () => winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
);

const setCorrelationId = async (req, res, next) => {
    let correlationId = req.headers["x-correlation-id"];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers["x-correlation-id"] = correlationId;
    }
    res.set("x-correlation-id", correlationId);
    return next();
};

const requestMessage = () => (req, res) => JSON.stringify({
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
});

const requestLogger = () => expressWinston.logger({
    level: 'info',
    transports: [consoleTransport(), mongodbTransport()],
    format: format(),
    meta: false,
    msg: requestMessage(),

});

const errorLogger = () => expressWinston.errorLogger({
    transports: [consoleTransport(), mongodbTransport()],
    format: format(),
    meta: false,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
});

module.exports = {
    setCorrelationId,
    requestLogger,
    errorLogger
}