const redisService = require("./../services/redis.service");
const logService = require("./../services/log.service");

const cacheProduct = async (req, res, next) => {
    try {
        const data = await redisService.get(req.params.productId);
        if (data == null) return next();
        logService.info("--- From cache ---");
        return res.status(200).send(data);
    } catch (err) {
        return next();
    }
};

module.exports = {
    cacheProduct
};
