const authService = require("../services/auth.service");
const { UnauthorizedError } = require("../utils/errors.util");
const { roles } = require("../utils/enums.util");

const authenticate = async (req, res, next) => {
    try {
        if (!req.headers.authorization)
            throw new UnauthorizedError("token not found");
        const token = req.headers.authorization?.split(" ")[1].trim();
        const decodedPayload = await authService.compareToken(token);
        req.user = await authService.getOneEmail(decodedPayload.email);
        if (decodedPayload.role !== req.user.role)
            throw new UnauthorizedError("token not valid");
        return next();
    } catch (err) {
        return next(err);
    }
};

const loggedUserOrAdmin = async (req, res, next) => {
    if (req.params.id !== req.user.id && req.user.role !== "admin")
        return next(new UnauthorizedError("Id not matching or not admin user"));
    return next();
};

const admin = async (req, res, next) => {
    if (roles[req.user.role] > roles["admin"])
        return next(new UnauthorizedError("You have to admin user"));
    return next();
};

const manager = async (req, res, next) => {
    if (roles[req.user.role] > roles["manager"])
        return next(new UnauthorizedError("You must be manager user"));
    return next();
};

const rolePermission = (req, res, next) => {
    if (!req.body.role) return next();
    if (req.body.role === "user" && req.user.role === "user")
        return next();
    if (req.body.role === "admin")
        return next(new UnauthorizedError("You can't make any one admin"));
    if (req.user.role === "admin") return next();
    return next(new UnauthorizedError("you have to be admin"));
};

module.exports = { authenticate, loggedUserOrAdmin, admin, rolePermission, manager };
