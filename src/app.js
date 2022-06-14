const express = require("express");
const app = express();

require("./middlewares")(app);
require("./utils/mongo.util")();
require("./routes")(app);

module.exports = app;
