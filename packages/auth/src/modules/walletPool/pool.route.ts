import { AddWalletToPoolService } from "./pool.service";
import { Pool } from "./pool.model";
import { authorize } from "../../middlewares/authenticate";

export async function walletPoolRoutes(fastify: any): Promise<void> {
    fastify.route({
        method: 'POST',
        url: '/walletPool',
        schema: {
            description: 'Get Wallet JWT',
            tags: ['X-HIDDEN'],
            body: {
                type: 'object',
                properties: {
                    url: { type: 'string' },
                    env: { type: 'string' },
                },
            },
        },
        preHandler: [authorize],
        handler: async (request: any, reply: any) => {
            const data = request.body as Pool;
            console.table(data);
            const walletService = new AddWalletToPoolService(fastify.pg, fastify.logger);
            const res = await walletService.addWalletToPool(data.url, data.env);

            reply.send({ result: res });
        }
    });

    fastify.route({
        method: 'POST',
        url: '/event',
        schema: {
            description: 'Get Wallet JWT',
            tags: ['EVENTS'],
            body: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },

        },
        handler: async (request: any, reply: any) => {
            const data = request.body;

            reply.send({ result: "res" });
        }
    });
}