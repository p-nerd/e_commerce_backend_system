const redisService = require("../services/redis.service");
const { response } = require("../utils/response");

const cacheProduct = async (req, res, next) => {
    try {
        const data = await redisService.get(req.params.productId);
        if (data == null) return next();
        return response(res, "Get one product from redis", data);
    } catch (err) {
        return next();
    }
};

module.exports = {
    cacheProduct
};
