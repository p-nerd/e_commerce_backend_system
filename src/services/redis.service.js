const { RedisError } = require("../utils/errors.util");

class RedisService {
    constructor(uri) {
        this.client = require("redis").createClient({ url: uri });
        this.client.on("error", (err) => console.log("Redis not connected\n", err));
        this.client.connect().then(() => console.log("Redis connected successfully"));
    };
    set = async function (key, value, ex = 1800) {
        return await this.client.SET(key, JSON.stringify(value), { EX: ex });
    };
    get = async function (key) {
        return JSON.parse(await this.client.GET(key));
    };
    ttl = async function (key) {
        return await this.client.TTL(key);
    };
    delete = async function (key) {
        try {
            return await this.client.del(key);
        } catch (err) {
            console.log("Here", err);
            throw new RedisError(err.message)
        }
    }
};

const redisService = new RedisService("redis://127.0.0.1:6379");
module.exports = redisService;
