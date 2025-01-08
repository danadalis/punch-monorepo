import { authorize } from '../../middlewares/authenticate';
import { OTPQuery, OTPResult, User } from './user.model';
import { CreateUserService } from './user.service';



export async function userRoutes(fastify: any): Promise<void> {

    fastify.route({
        method: 'GET',
        url: '/user/{userId}',
        schema: {
            description: 'Get user',
            tags: ['Users'],
            params: {
                type: 'object',
                properties: {
                    userId: { type: 'string' }
                }
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
                                phone_number: { type: 'string' }
                            },
                        },
                    },
                },
            },
        },
        preHandler: authorize,
        handler: async (request: any, reply: any) => {
            const { userId } = request.params;
            reply.send({ result: "" });
        }
    });

    
    fastify.route({
        method: 'POST',
        url: '/user',
        schema: {
            description: 'Create User',
            tags: ['Users'],
            body: {
                type: 'object',
                properties: {
                    phone_number: { type: 'string' },
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
                                phone_number: { type: 'string' },
                                userid: { type: 'string' },
                                walletId: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        preHandler: [authorize],
        handler: async (request: any, reply: any) => {
            const data = request.body as User;
            console.table(data);
            const userService = new CreateUserService(fastify.pg, fastify.logger);
            const res = await userService.createUser(data);

            reply.send({ result: res });
        }
    });

    fastify.route({
        method: 'POST',
        url: '/send-otp',
        schema: {
            description: 'send OTP',
            tags: ['Users'],
            body: {
                type: 'object',
                properties: {
                    phoneNumber: { type: 'string' },
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
                                status: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        preHandler: [],
        handler: async (request: any, reply: any) => {
            const data = request.body as OTPQuery;
            console.table(data);
            const userService = new CreateUserService(fastify.pg, fastify.logger);
            const res = await userService.sendOTP(data);

            reply.send({ result: res });
        }
    });

    fastify.route({
        method: 'POST',
        url: '/verify-otp',
        schema: {
            description: 'verify OTP',
            tags: ['Users'],
            body: {
                type: 'object',
                properties: {
                    phone_number: { type: 'string' },
                    code: { type: 'string' },
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
                                status: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        preHandler: [],
        handler: async (request: any, reply: any) => {
            const data = request.body as OTPResult;
            console.table(data);
            const userService = new CreateUserService(fastify.pg, fastify.logger);
            const res = await userService.verifyOtp(data);

            reply.send({ result: res });
        }
    });


    fastify.route({
        method: 'GET',
        url: '/users',
        schema: {
            description: 'List Users',
            tags: ['Users'],
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        result: {
                            type: 'object',
                            properties: {
                                users: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            walletId: { type: 'string' },
                                            phone_number: { type: 'string' }
                                        }
                                    }
                                }
                            },
                        },
                    },
                },
            },
        },
        preHandler: [],
        handler: async (request: any, reply: any) => {
            reply.send({ result: "" });
        }
    });


}