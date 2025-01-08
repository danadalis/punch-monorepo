import { getDfnsClient } from '../../utilities/DfnsClient';
import { BlockchainNetwork } from '@dfns/sdk/codegen/datamodel/Wallets';
import { Wallet } from './create.model';

import { Logger } from '../../interfaces/ILogger';

export class WalletCreation {
    constructor(private logger:Logger){}
    async createWallet(wallet: Wallet) {
        try {
            this.logger.info("start creating a new wallet");
            const dfnsClient = getDfnsClient();
            const res = await dfnsClient.dfnsApi.wallets.createWallet({body:{
                network: process.env.ENV === "1" ? BlockchainNetwork.PolygonMumbai : BlockchainNetwork.Polygon,
                name: wallet.name,
            }});


            console.log(JSON.stringify(res));
            return res;
            

        }catch (error) {
            this.logger.error(`Wallet Creation: ${error}`);
            throw error;

        }

    }
}

