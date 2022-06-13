const { UserDataModel } = require("./../models/user.model");
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    InternalSeverError
} = require("../utils/response.util");
const cryptoService = require("./crypto.service");
const jwtService = require("./jwt.service");

class AuthService {
    getOneEmail = async (email) => {
        try {
            const user = await UserDataModel.findOne({ email });
            if (!user) throw new NotFoundError("user not found by the email");
            return user;
        } catch (err) {
            if (err.status && err.status === 404) throw err;
            throw new InternalSeverError(err.message);
        }
    };
    comparePassword = async (password, hash) => {
        try {
            const result = await cryptoService.compare(password, hash);
            if (!result) throw new BadRequestError("password not matching");
            return;
        } catch (err) {
            if (err.status && err.status === 400) throw err;
            throw new InternalSeverError(err.message);
        }
    };
    generateToken = async (user) => {
        try {
            const jwtPayload = {
                id: user.id,
                email: user.email,
                role: user.role
            };
            return await jwtService.token(jwtPayload);
        } catch (err) {
            throw new InternalSeverError(err.message);
        }
    };
    compareToken = async (token) => {
        try {
            if (!token) throw new Error("Token not found");
            return await jwtService.compare(token);
        } catch (err) {
            throw new UnauthorizedError(err.message);
        }
    };
}

const authService = new AuthService();
module.exports = authService;
