import { getDfnsClient } from '../../utilities/DfnsClient';
import { Logger } from '../../interfaces/ILogger';

export class BalanceService { 
  constructor(private logger: Logger) {}
 
  async getBalance(walletId: string) {
    try {  

      this.logger.info('Starting balance retrieval');
      
      const dfnsClient = getDfnsClient();
      const res = await dfnsClient.dfnsApi.wallets.getWalletAssets({walletId: walletId});

      return res;
      
    } catch (error) {
      this.logger.error('Error retrieving balance', JSON.stringify(error)); 

      throw error;
    }
  }
}
