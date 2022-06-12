const jsonwebtoken = require("jsonwebtoken");
const {
    JWT_EXPIRES_IN_MINUTE,
    JWT_SECRET_KEY
} = require("./../utils/config.util");

class JwtService {
    token = (payload) =>
        new Promise((resolve, reject) => {
            jsonwebtoken.sign(
                payload,
                JWT_SECRET_KEY,
                { expiresIn: JWT_EXPIRES_IN_MINUTE },
                (err, token) => {
                    if (err) return reject(err);
                    return resolve(token);
                }
            );
        });
    compare = (token) =>
        new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, JWT_SECRET_KEY, (err, decoded) => {
                if (err) return reject(err);
                return resolve(decoded);
            });
        });
}

const jwtService = new JwtService();
module.exports = jwtService;
