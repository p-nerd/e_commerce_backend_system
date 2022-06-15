const set = (key, def) => (key ? key : def);
const { NODE_ENV } = require("./../utils/config");
const envs = require("./../utils/enums");

const log = (message) => {
    if (NODE_ENV !== envs.testing) {
        console.log(message);
    }
};

module.exports = {
    set,
    log
};
