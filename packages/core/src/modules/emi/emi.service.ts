import { getDfnsClient } from '../../utilities/DfnsClient';
import { getMoneriumClient } from '../../utilities/MoneriumClient';
import { Utils } from 'alchemy-sdk';
import { AssingEmi } from './emi.model';
import { Logger } from '../../interfaces/ILogger';

export class AddToMonerium {
    constructor(private logger: Logger) { }

    async AddWallet(wallet: AssingEmi) {
        try {
            this.logger.info("start connection to Monerium " + wallet.walletId);

            const dfnsClient = getDfnsClient();
            const moneriumClient = getMoneriumClient();

            const signature = await dfnsClient.dfnsApi.wallets.getSignature({ signatureId: wallet.signatureId, walletId: wallet.walletId });

            var byteRecid = 0;
            if (signature.signature?.recid == 0) {
                byteRecid = 27;
            } else {
                byteRecid = 28;
            }

            const r = signature.signature?.r.toString();
            const s = signature.signature?.s.toString();
            const recid = signature.signature?.recid;
            const expandedSig = {
                r: r!,
                s: s,
                v: byteRecid,
                recoveryParam: recid,
            }
            this.logger.info("get the signature with sign id " + signature.id);
            var sign = Utils.joinSignature(expandedSig);

            let authFlowUrl = await moneriumClient.monerium.authorize({
                address: wallet.address, 
                signature: sign, 
                chainId: process.env.ENV === "1" ? 8001 : 137 
              });
        

            return authFlowUrl;

        } catch (error) {
            console.log("Error Monerium: " + error);
            this.logger.error(`connection error: ${error}`);
            throw Error("error:" + error);
        }

    }
}