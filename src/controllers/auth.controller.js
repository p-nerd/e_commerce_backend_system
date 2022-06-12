const authService = require("./../services/auth.service");

const loginUser = async (req, res, next) => {
    try {
        const user = await authService.getOneEmail(req.body.email);
        await authService.comparePassword(req.body.password, user.password);
        const token = await authService.generateToken(user);
        res.status(200).send({ token });
    } catch (err) {
        return next(err);
    }
};

const updateToken = async (req, res, next) => {
    try {
        const token = await authService.generateToken(req.user);
        res.status(200).send({ token });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    loginUser,
    updateToken
};
