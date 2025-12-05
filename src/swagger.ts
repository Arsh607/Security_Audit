import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Waste Management API",
      version: "1.0.0",
      description: "Capstone API documentation for Milestone 1"
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local development server"
      }
    ]
  },
  apis: ["./src/api/v1/routes/*.ts"]
};

export const swaggerSpec = swaggerJsdoc(options);
