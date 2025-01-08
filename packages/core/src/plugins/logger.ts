import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import pino from 'pino';

const loggerPlugin: FastifyPluginCallback = (fastify, opts, done) => {
  const logger = pino({
    level: 'info',
    transport: {
        target: 'pino-mongodb',
        options: {
          uri: process.env.MONGOURL,
          database: 'punch',
          collection: 'logs',
          mongoOptions: {
            auth: {
              username: 'poc',
              password: process.env.MONGOPASSWORD
            }
          }
        }
          }
  });

  fastify.decorate('logger', logger);
  done();
};

export default fp(loggerPlugin);