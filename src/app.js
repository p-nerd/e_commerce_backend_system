const express = require("express");
const app = express();

require("./middlewares")(app);
require("./controllers")(app);
require("./utils/mongo.util")();

module.exports = app;
