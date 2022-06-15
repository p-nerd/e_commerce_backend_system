const { REDIS_URI, DEFAULT_REDIS_EXPIRE } = require("../utils/config");
const { log } = require("./utils.service");

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
            log("Redis not connected\n", err);
        });
        this.client.connect().then(() => {
            log(`Redis connected successfully with ${REDIS_URI}`);
        });
    }
    set = async function (key, value, ex = DEFAULT_REDIS_EXPIRE) {
        try {
            return await this.client.SET(key, JSON.stringify(value), {
                EX: ex
            });
        } catch (err) {
            throw new RedisError(err.message);
        }
    };
    get = async function (key) {
        try {
            return JSON.parse(await this.client.GET(key));
        } catch (err) {
            throw new RedisError(err.message);
        }
    };
    ttl = async function (key) {
        try {
            return await this.client.TTL(key);
        } catch (err) {
            throw new RedisError(err.message);
        }
    };
    del = async function (key) {
        try {
            return await this.client.del(key);
        } catch (err) {
            throw new RedisError(err.message);
        }
    };
}

const redisService = new RedisService(REDIS_URI);
module.exports = redisService;
