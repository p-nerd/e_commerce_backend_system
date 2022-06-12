const { NODE_ENV } = require("./config.util");
const { envs } = require("./enums.util");

const logger = {
    info: (message) => {
        if (NODE_ENV !== envs.testing) {
            console.log(message);
        }
    }
};

module.exports = logger;
