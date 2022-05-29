const app = require("./app");
const { APP_PORT, MONGODB_URI } = require("./utils/config.util");
const { connectToMongo } = require("./utils/mongo.util");

app.listen(APP_PORT, async () => {
    console.info(`Application listening on port: ${APP_PORT}`);
    await connectToMongo();
    console.info(`Connected to MongoDB successful with ${MONGODB_URI}`);
});
