import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import pino from 'pino';

const loggerPlugin: FastifyPluginCallback = (fastify, opts, done) => {
  const logger = pino({
    level: 'info',
    transport: {
        target: 'pino-mongodb',
        level: 'info',
        options: {
          uri: process.env.MONGOURL,
          database: 'punch',
          collection: 'AuthLogs',
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
