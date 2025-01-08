const { Pool } = require('pg');
const fastifyp = require('fastify-plugin');

async function fastifyPostgres(fastify: any, options: any) {

  const pool = new Pool(options);
  if (!pool) {
    throw new Error("Failed to create a new Pool");
  }
  console.log("Pool created:", !!pool);

  fastify.decorate('pg', pool);
  
  fastify.addHook('onClose', async () => {
    await pool.end();
  });
}

module.exports = fastifyp(fastifyPostgres);