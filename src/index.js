const app = require("./app");
const { APP_PORT } = require("./utils/config.util");
const logService = require("./services/log.service");

app.listen(APP_PORT, async () => {
    logService.info(`App listening on port: ${APP_PORT}`);
});
