const jsonwebtoken = require("jsonwebtoken");
const { JWT_EXPIRES_IN, JWT_SECRET_KEY } = require("./../utils/config.util");

class JwtService {
    getToken = (payload) => new Promise((resolve, reject) => {
        jsonwebtoken.sign(payload, JWT_SECRET_KEY,
            { expiresIn: JWT_EXPIRES_IN },
            (err, token) => {
                if (err) reject(err);
                else resolve(token);
            },
        );
    });
    tokenCompare = (token) => new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded);
        });
    });
}

const jwtService = new JwtService;
module.exports = jwtService;
