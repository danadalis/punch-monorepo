import { authorize } from "../../middlewares/authenticate";
import { SignatureService } from "./signature.service";
import { GenerateSignature, Signature }   from './signature.model';

export async function signatureRoutes(fastify: any) {
    
    fastify.route({
        method: 'POST',
        url: '/signature',
        schema: {
            description: 'Generate signature',
            tags: ['Auth'],
            body: {
                type: 'object',
                properties: {
                    walletid: { type: 'string' },
                    message: { type: 'string' }
                },
                required: ['walletid', 'env', 'message'],
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
                                walletId: { type: 'string' },
                                network: { type: 'string' },
                                requestBody: {
                                    type: 'object',
                                    properties: {
                                        kind: { type: 'string', enum: ['Hash'] },
                                        hash: { type: 'string' }
                                    },
                                    required: ['kind', 'hash'],
                                    additionalProperties: false
                                },
                                status: { type: 'string', enum: ['Pending'] }, // Adjust if there are other status values
                                dateRequested: { type: 'string', format: 'date-time' }
                            },
                            required: ['id', 'walletId', 'network', 'requestBody', 'status', 'dateRequested'],
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
            var data = request.body as GenerateSignature;

            var createSign = new SignatureService(fastify.logger);

            fastify.logger.info('request to generate signature: ' + data.walletid);
            const res = await createSign.CreateSignature(data);

            reply.send({ result: res });
        }
    });


    fastify.route({
        method: 'POST',
        url: '/getsignature',
        schema: {
            description: 'Get signature',
            tags: ['Auth'],
            body: {
                type: 'object',
                properties: {
                    walletid: { type: 'string' },
                    signid: { type: 'string' }
                },
                required: ['walletid', 'env', 'signid'],
                additionalProperties: false
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        result: {
                            type: 'object',
                            properties: {
                                requestBody: {
                                    type: 'object',
                                    properties: {
                                        kind: { type: 'string' },
                                        hash: { type: 'string', pattern: '^0x[a-fA-F0-9]{64}$' }
                                    },
                                    required: ['kind', 'hash']
                                },
                                status: { type: 'string' },
                                walletId: { type: 'string' },
                                network: { type: 'string' },
                                signature: {
                                    type: 'object',
                                    properties: {
                                        r: { type: 'string', pattern: '^0x[a-fA-F0-9]{64}$' },
                                        s: { type: 'string', pattern: '^0x[a-fA-F0-9]{64}$' },
                                        recid: { type: 'integer' },
                                        encoded: { type: 'string' } // Assuming it's a hex string; adjust the pattern if needed.
                                    },
                                    required: ['r', 's', 'recid', 'encoded']
                                },
                                dateSigned: { type: 'string', format: 'date-time' },
                                dateRequested: { type: 'string', format: 'date-time' },
                                id: { type: 'string' },
                            },
                            required: [
                                'requestBody',
                                'status',
                                'walletId',
                                'network',
                                'signature',
                                'dateSigned',
                                'dateRequested',
                                'id',
                            ]
                        }
                    },
                    required: ['result']
                }
            }

        },
        preHandler: authorize,
        handler: async (request: any, reply: any) => {
            var data = request.body as Signature;

            var sign = new SignatureService(fastify.logger);

            fastify.logger.info('request to generate signature: ' + data.walletid);
            const res = await sign.GetSignature(data);

            reply.send({ result: res });
        }
    });

    
}

