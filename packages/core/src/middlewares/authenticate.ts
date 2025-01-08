import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

function isAuthenticated(request: any) {
    const apiKey = request.headers['x-api-key'];
    if (!apiKey)
        return false;
    if (apiKey !== process.env.APIKEY)
        return false;

    return true;
}

export function authorize(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void {
    if (isAuthenticated(request)) {
        done();
    } else {
        reply.code(401).send('Unauthorized');
    }
}
