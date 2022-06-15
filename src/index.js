const app = require("./app");
const { APP_PORT } = require("./utils/config");
const { log } = require("./services/utils.service");

app.listen(APP_PORT, async () => {
    log(`App listening on port: ${APP_PORT}`);
});
