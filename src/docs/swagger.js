import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { config } from "dotenv";

config();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         role:
 *           type: string
 *           enum: ["user", "admin"]
 *     Project:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *     ValidationError:
 *       description: Request body validation failed
 */

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Projectify  API",
    version: "1.0.0",
    description: "A REST API for managing projects - projectify",
    contact: {
      name: "API Support",
      email: "alphonsusgee@gmail.com",
    },
  },
  servers: [
    {
      url: process.env.API_BASE_URL || "http://localhost:3000/api/v1/",
      description:
        process.env.NODE_ENV === "production"
          ? "Production server"
          : "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT Authorization header using the Bearer scheme",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          username: { type: "string" },
          role: { type: "string", enum: ["user", "admin"] },
        },
      },
      Project: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
      },
    },

    // schemas: {
    //   ErrorResponse: {
    //     type: "object",
    //     properties: {
    //       success: {
    //         type: "boolean",
    //         example: false,
    //       },
    //       error: {
    //         type: "string",
    //         example: "Error message",
    //       },
    //     },
    //   },
    // },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "User login and registration",
    },
    {
      name: "Projects",
      description: "Project management operations",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: "Projectify API Documentation",
      customCss: ".swagger-ui .topbar { display: none }",
      swaggerOptions: {
        docExpansion: "list",
        filter: true,
        persistAuthorization: true,
      },
    })
  );

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(` API docs available at /api-docs`);
};
