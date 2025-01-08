import { Utils } from 'alchemy-sdk';

import { getDfnsClient } from '../../utilities/DfnsClient';
import { SignatureKind } from '@dfns/sdk/codegen/datamodel/Wallets';
import { GenerateSignature, Signature } from './signature.model';
import { Logger } from '../../interfaces/ILogger';

export class SignatureService {
    constructor(private logger: Logger) { }
    async CreateSignature(sign: GenerateSignature) {
        try {
            const message = sign.message;
            const hash = Utils.hashMessage(message);
            this.logger.info("start sign");
            const dfnsClient = getDfnsClient();
            const generateSignatureRes = await dfnsClient.dfnsApi.wallets.generateSignature({
                walletId: sign.walletid, body: {
                    kind: SignatureKind.Hash,
                    hash: hash
                }
            });
            console.table("sign: " + generateSignatureRes);
            return generateSignatureRes;

        } catch (error) {
            this.logger.error(`generate signature error: ${error}`);
            throw error;
        }


    }

    async GetSignature(sign: Signature) {

        try {
            const dfnsClient = getDfnsClient();
            const signResult = await dfnsClient.dfnsApi.wallets.getSignature({ signatureId: sign.signid, walletId: sign.walletid });

            return signResult;

        } catch (err) {
            this.logger.error(`generate signature error: ${err}`);
        }
    }


}