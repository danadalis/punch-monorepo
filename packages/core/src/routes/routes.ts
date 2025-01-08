import { emiRoutes } from "../modules/emi/emi.routes";
import { signatureRoutes } from "../modules/signature/signature.routes";
import { walletRoutes } from "../modules/wallet/wallet.routes";



async function punchRoutes(fastify: any, options: any) {
    signatureRoutes(fastify);
    emiRoutes(fastify);
    walletRoutes(fastify);
}

module.exports = punchRoutes;
