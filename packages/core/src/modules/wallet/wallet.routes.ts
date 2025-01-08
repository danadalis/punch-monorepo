import { authorize } from "../../middlewares/authenticate";
import { BalanceService } from "./balance.service";
import { Wallet } from "./create.model";
import { WalletCreation } from "./create.service";
import { WalletDetails } from "./details.service";

export async function walletRoutes(fastify: any) {

    fastify.route({
        method: 'GET',
        url: '/balance',
        schema: {
            description: 'Get wallet balance',
            tags: ['Wallets'],
            querystring: {
                type: 'object',
                properties: {
                    walletid: { type: 'string' }
                },
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        result: {
                            type: 'object',
                            properties: {
                                walletId: { type: 'string' },
                                network: { type: 'string' },
                                assets: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            symbol: { type: 'string' },
                                            contract: { type: 'string' },
                                            decimals: { type: 'integer' },
                                            balance: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        preHandler: authorize,
        handler: async (request: any, reply: any) => {
            const { walletid } = request.query;
            var balanceService = new BalanceService(fastify.logger);

            fastify.logger.info('request balance for wallet: ' + walletid);
            var res = await balanceService.getBalance(walletid);

            reply.send({ result: res });
        }
    });


    fastify.route({
        method: 'POST',
        url: '/createwallet',
        schema: {
            description: 'Create a new wallet',
            tags: ['X-HIDDEN'],
            // Request validation
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    env: { type: 'string' }
                },
                required: ['name', 'env'],
                additionalProperties: false
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        result: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                network: { type: 'string' },
                                signingKey: {
                                    type: 'object',
                                    properties: {
                                        scheme: { type: 'string' },
                                        curve: { type: 'string' },
                                        publicKey: { type: 'string' }
                                    },
                                    required: ['scheme', 'curve', 'publicKey'],
                                    additionalProperties: false
                                },
                                address: { type: 'string' },
                                status: { type: 'string' },
                                name: { type: 'string' },
                                tags: {
                                    type: 'array',
                                    items: { type: 'string' } // Modify this if tags have a different structure
                                },
                                dateCreated: { type: 'string', format: 'date-time' }
                            },
                            required: ['id', 'network', 'signingKey', 'address', 'status', 'name', 'tags', 'dateCreated'],
                            additionalProperties: false
                        }
                    },
                    required: ['result'],
                    additionalProperties: false
                }
            }

        },
        preHandler: authorize,
        handler: async (request: any, reply: any) => {
            var data = request.body as Wallet;
            var walletCreationService = new WalletCreation(fastify.logger);

            fastify.logger.info('request to create a wallet with name: ' + data.name);
            const result = await walletCreationService.createWallet(data);

            reply.send({ result: result });
        }
    });

    fastify.route({
        method: 'GET',
        url: '/wallet',
        schema: {
            description: 'Get details of a wallet',
            tags: ['Wallets'],
            querystring: {
                type: 'object',
                properties: {
                    walletid: { type: 'string' }
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        result: {
                            type: 'object',
                            properties: {
                                dateCreated: { type: 'string', format: 'date-time' },
                                status: { type: 'string' },
                                address: { type: 'string' },
                                name: { type: 'string' },
                                network: { type: 'string' },
                                id: { type: 'string' },
                                tags: {
                                    type: 'array',
                                    items: { type: 'string' } // Modify this if tags have a different structure
                                },
                                signingKey: {
                                    type: 'object',
                                    properties: {
                                        scheme: { type: 'string' },
                                        curve: { type: 'string' },
                                        publicKey: { type: 'string' }
                                    },
                                    required: ['scheme', 'curve', 'publicKey'],
                                    additionalProperties: false
                                }
                            },
                            required: ['dateCreated', 'status', 'address', 'name', 'network', 'id', 'tags', 'signingKey'],
                            additionalProperties: false
                        }
                    },
                    required: ['result'],
                    additionalProperties: false
                }
            }

        },
        preHandler: authorize,
        handler: async (request: any, reply: any) => {
            const { env, walletid } = request.query;
            var walletDetailsService = new WalletDetails(fastify.logger);
            fastify.logger.info('request details for wallet: ' + walletid);
            const res = await walletDetailsService.getWalletDetails(walletid);

            reply.send({ result: res });
        }
    });
}

