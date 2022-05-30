const authService = require("./../services/auth.service");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1].trim();
        const decodedPayload = await authService.compareToken(token);
        req.user = decodedPayload;
        return next();
    } catch (err) {
        return next(err);
    }
};

module.exports = { authenticate };