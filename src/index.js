const app = require("./app");
const { APP_PORT } = require("./utils/config.util");
const logger = require("./utils/logger.util");

app.listen(APP_PORT, async () => {
    logger.info(`App listening on port: ${APP_PORT}`);
});
