import fp from 'fastify-plugin';
import fastifySwagger, { type FastifySwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { withRefResolver } from 'fastify-zod';

export default fp<FastifySwaggerOptions>(async (fastify) => {

  const PORT = 8080;
  const SWAGGER_PATH = '/documentation';

  await fastify.register(
    fastifySwagger,
    withRefResolver({
      openapi: {
        
        info: {
          title: 'Punch Auth API',
          description: 'Punch Auth API',
          version: '0.0.1',
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
      
    }),
  );

  await fastify.register(fastifySwaggerUI, {
    routePrefix: "docs",
  });

  fastify.log.info(
    `Swagger documentation is running at http://localhost:${PORT}${SWAGGER_PATH}`,
  );
});