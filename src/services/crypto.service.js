const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("./../utils/config.util");

class CryptoService {
    hash = async (password) => {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    };

    compare = async (password, hash) => {
        return await bcrypt.compare(password, hash);
    };
}


const cryptoService = new CryptoService();
module.exports = cryptoService;