const express = require("express");
const app = express();

(async () => {
    await require("./middlewares")(app);
    require("./utils/mongo.util")();
    require("./routes")(app);
})();

module.exports = app;
