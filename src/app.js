const express = require("express");
const morgan = require("morgan");
const { unknownRoute, errorHandler } = require("./middlewares/errors.middleware");
const router = require("./routes");
const redisService = require("./services/redis.service");
const app = express();

const test_redis = async () => {
    try {
        const data = await redisService.set("good", "{ hello: 234 }");
        console.log(data);
        const data2 = await redisService.get("good");
        if (data2 == null) throw new Error("data not found");
        console.log(data2);
        setTimeout(async () => {
            console.log(await redisService.ttl("good"));
        }, 2002);
    } catch (err) {
        console.log(err.message);
    }
};

test_redis();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", router)
app.use(unknownRoute);
app.use(errorHandler);

module.exports = app;
