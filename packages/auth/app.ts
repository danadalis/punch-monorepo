import * as dotenv from "dotenv";
import swagger from "./src/plugins/swagger";
import loggerPlugin from './src/plugins/logger';

const fastifyPostgres = require('./src/plugins/postgres');

const authApi = require('./src/routes/routes');
const fs = require('fs');

dotenv.config();

const fastify = require('fastify')({ logger: false });


const start = async () => {
    try {
        await fastify.register(fastifyPostgres, {
            host: process.env.DBHOST,
            port: 5432,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: 'postgres',
            ssl: {
              rejectUnauthorized: true,
              //ca: fs.readFileSync('./eu-north-1-bundle.pem').toString()
            }
          });

        fastify.register(loggerPlugin);
        fastify.register(swagger);
        fastify.register(authApi);

        await fastify.ready();
        fastify.logger.info("starting auth service")

        await fastify.listen({ port: 2016 });
    } catch (err) {
        console.table(err)
        process.exit(1);
    }
};

start();

