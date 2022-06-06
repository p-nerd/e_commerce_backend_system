const express = require("express");
const morgan = require("morgan");
const { unknownRoute, errorHandler } = require("./middlewares/errors.middleware");
const router = require("./routes");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", router)
app.use(unknownRoute);
app.use(errorHandler);

module.exports = app;
