const express = require("express");
const { unknownRoute, errorHandler } = require("./middlewares/errors.middleware");
const router = require("./routes");
const app = express();

app.use(express.json());
app.use("/api/v1", router)
app.use(unknownRoute);
app.use(errorHandler);

module.exports = app;
