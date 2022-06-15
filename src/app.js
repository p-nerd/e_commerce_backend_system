const express = require("express");
const app = express();

require("./middlewares")(app);
require("./utils/mongo")();
require("./controllers")(app);

module.exports = app;
