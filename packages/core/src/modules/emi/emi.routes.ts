import { authorize } from "../../middlewares/authenticate";
import { AssingEmi } from "./emi.model";
import { AddToMonerium } from "./emi.service";

export async function emiRoutes(fastify: any){
    fastify.route({
        method: 'POST',
        url: '/iban',
        schema: {
            description: 'Get IBAN details for a wallet address',
            tags: ['IBAN'],
            body: {
                type: 'object',
                properties: {
                    env: { type: 'string' },
                    address: { type: 'string' }
                },
                required: ['env', 'address'],
                additionalProperties: false
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        result: {
                            type: 'object',
                            properties: {
                                standard: { type: 'string', enum: ['iban'] }, // Used enum as you specified "iban" as a standard
                                iban: { type: 'string' },
                                bic: { type: 'string' }
                            },
                            required: ['standard', 'iban', 'bic'],
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
        }
    });

    fastify.route({
        method: 'POST',
        url: '/connectWallet',
        schema: {
            description: 'connect wallet to iban',
            tags: ['IBAN'],
            body: {
                type: 'object',
                properties: {
                    walletId: { type: 'string' },
                    address: { type: 'string' },
                    signatureId: { type: 'string' },
                    message: { type: 'string' }
                },
                required: ['walletId', 'env', 'address', 'signatureId', 'message'],
                additionalProperties: false
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        result: { type: 'string' }
                    },
                    required: ['result'],
                    additionalProperties: false
                }
            }

        },
        preHandler: authorize,
        handler: async (request: any, reply: any) => {
            var data = request.body as AssingEmi;

            var addToMonerium = new AddToMonerium(fastify.logger);


            fastify.logger.info('request to connect wallet to Monerium: ' + data.address);
            const res = await addToMonerium.AddWallet(data);

            reply.send({ result: res });
        }
    });


}

