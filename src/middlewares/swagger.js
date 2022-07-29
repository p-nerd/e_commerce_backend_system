const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const fs = require("node:fs");

const swaggerConfig = () => {
    let config = fs.readFileSync("swaggerrc.json");
    config = JSON.parse(config.toString());
    const swaggerSpecification = swaggerJsDoc(config);
    const swagger = [swaggerUI.serve, swaggerUI.setup(swaggerSpecification)];
    return swagger;
};

module.exports = swaggerConfig;
