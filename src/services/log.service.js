const { NODE_ENV } = require("./../utils/config.util");
const { envs } = require("./../utils/enums.util");

class LogService {
    info = (message) => {
        if (NODE_ENV !== envs.testing) {
            console.log(message);
        }
    };
}

const logService = new LogService();
module.exports = logService;
