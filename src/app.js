const express = require("express");
const app = express();

require("./middlewares")(app);
require("./utils/mongo.util")();
require("./controllers")(app);

module.exports = app;
