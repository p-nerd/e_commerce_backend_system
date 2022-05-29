const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("./config.util");

const hash = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

const compare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = {
    hash,
    compare
}