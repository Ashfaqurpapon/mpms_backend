import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API docs',
    },
    servers: [
      { url: 'http://localhost:8000/api' }, // or 'http://localhost:8000/api'
    ],
  },
  apis: ['./app/routes/**/*.ts', './app/modules/**/*.ts'], // ✅ scan all route files
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
