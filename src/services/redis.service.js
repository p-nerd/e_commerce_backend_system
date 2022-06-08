const { REDIS_URI } = require("../utils/config.util");

class RedisError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = "Redis Error";
        this.status = 500;
    }
}

class RedisService {
    constructor(uri) {
        this.client = require("redis").createClient({ url: uri });
        this.client.on("error", (err) => {
            console.log("Redis not connected\n", err)
        });
        this.client.connect().then(() => {
            console.log(`Redis connected successfully with ${REDIS_URI}`)
        });
    };
    set = async function (key, value, ex = 1800) {
        try {
            return await this.client.SET(
                key,
                JSON.stringify(value),
                { EX: ex }
            );
        } catch (err) {
            throw new RedisError(err.message)
        }
    };
    get = async function (key) {
        try {
            return JSON.parse(await this.client.GET(key));
        } catch (err) {
            throw new RedisError(err.message)
        }
    };
    ttl = async function (key) {
        try {
            return await this.client.TTL(key);
        } catch (err) {
            throw new RedisError(err.message)
        }
    };
    del = async function (key) {
        try {
            return await this.client.del(key);
        } catch (err) {
            throw new RedisError(err.message)
        }
    }
};

const redisService = new RedisService(REDIS_URI);
module.exports = redisService;
