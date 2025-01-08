import fp from 'fastify-plugin';
import fastifySwagger, { type FastifySwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { withRefResolver } from 'fastify-zod';

export default fp<FastifySwaggerOptions>(async (fastify) => {

  await fastify.register(
    fastifySwagger,
    withRefResolver({
      openapi: {
        
        info: {
          title: 'Punch API',
          description: 'Punch API',
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
});