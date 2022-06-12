const redisService = require("../services/redis.service");
const logger = require("../utils/logger.util");

const cacheProduct = async (req, res, next) => {
    try {
        const data = await redisService.get(req.params.productId);
        if (data == null) return next();
        logger.info("--- From cache ---");
        return res.status(200).send(data);
    } catch (err) {
        return next();
    }
};

module.exports = {
    cacheProduct
};
