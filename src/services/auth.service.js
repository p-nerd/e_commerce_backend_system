const { UserDataModel } = require("./../models/user.model");
const { BadRequestError, NotFoundError, UnauthorizedError, InternalSeverError } = require("./../utils/errors.util");
const crypto = require("./../utils/crypto.util");
const jwt = require("./../utils/jwt.util");

const getOneEmail = async (email) => {
    try {
        const user = await UserDataModel.findOne({ email });
        if (!user) throw new NotFoundError("user not found by the email");
        return user;
    } catch (err) {
        if (err.status && err.status === 404) throw err;
        throw new InternalSeverError(err.message);
    }
}

const comparePassword = async (password, hash) => {
    try {
        const result = await crypto.compare(password, hash);
        if (!result) throw new BadRequestError("password not matching");
        return;
    } catch (err) {
        if (err.status && err.status === 400) throw err;
        throw new InternalSeverError(err.message);
    }
}

const generateToken = async (user) => {
    try {
        const jwtPayload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        return await jwt.getToken(jwtPayload);
    } catch (err) {
        throw new InternalSeverError(err.message);
    }
}

const compareToken = async (token) => {
    try {
        if (!token) throw new Error("Token not found");
        return await jwt.tokenCompare(token);
    } catch (err) {
        throw new UnauthorizedError(err.message);
    }
}

module.exports = {
    getOneEmail: getOneEmail,
    comparePassword,
    generateToken,
    compareToken,
}