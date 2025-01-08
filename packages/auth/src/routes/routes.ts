import { userRoutes } from "../modules/user/user.route";
import { walletPoolRoutes } from "../modules/walletPool/pool.route";

async function authApi(fastify: any, options: any) {

    userRoutes(fastify);
    walletPoolRoutes(fastify);
}

module.exports = authApi;
