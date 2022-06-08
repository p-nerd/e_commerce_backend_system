const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const app = express();
const { unknownRoute, errorHandler } = require("./middlewares/errors.middleware");

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", router)
app.use(errorHandler);
app.use(unknownRoute);

module.exports = app;
