const set = (key, def) => (key ? key : def);

const log = (message) => {
    if (NODE_ENV !== envs.testing) {
        console.log(message);
    }
};

module.exports = {
    set,
    log
};
