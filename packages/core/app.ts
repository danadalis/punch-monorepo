import loggerPlugin from './src/plugins/logger';
import swagger from './src/plugins/swagger';
const punchRoutes = require('./src/routes/routes');
const fastify = require('fastify')({ logger: false });
import fastifyCors from "@fastify/cors";
require('dotenv').config()

const start = async () => {
  try {
/*     await fastify.register(fastifyCors, {
      origin: process.env.CLIENT_ORIGIN,
      allowedHeaders: ["Authorization"],
    });
 */
    fastify.register(swagger);
    fastify.register(loggerPlugin);
    fastify.register(punchRoutes);
    
    await fastify.ready();
    //fastify.logger.info("Server starting prod")
    
    await fastify.listen({ port: 8080 });
  } catch (err) {
    console.table(err)
    process.exit(1);
  }
};

start();
