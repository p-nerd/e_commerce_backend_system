const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerSpecification = swaggerJsDoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "e-commerce backend system",
            version: "1.0.0",
            description: "A e-commerce backend system with node"
        }
    },
    apis: ["./doc/**/*.yml"]
});

const swagger = [swaggerUI.serve, swaggerUI.setup(swaggerSpecification)];

module.exports = swagger;
