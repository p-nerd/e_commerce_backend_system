const app = require("./app");
const { APP_PORT } = require("./utils/config.util");

app.listen(APP_PORT, async () => {
    console.info(`App listening on port: ${APP_PORT}`);
    await connectToMongo();
});
