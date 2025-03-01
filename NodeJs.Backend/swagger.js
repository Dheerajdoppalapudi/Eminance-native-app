const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API with Prisma and JWT Authentication",
      version: "1.0.0",
      description: "API documentation for the Node.js backend",
    },
    servers: [
      {
        url: "http://localhost:8000", 
      },
    ],
  },
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
