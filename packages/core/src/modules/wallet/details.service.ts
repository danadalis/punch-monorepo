import { getDfnsClient } from '../../utilities/DfnsClient';
import { Logger } from '../../interfaces/ILogger';

export class WalletDetails {
  constructor(private logger: Logger) {}

  async getWalletDetails(walletId: string) {
    try {
      const dfnsClient = await getDfnsClient(); 
      const res = await dfnsClient.dfnsApi.wallets.getWallet({ walletId });
      console.log(JSON.stringify(res));
      return res;
    } catch (error) {
      this.logger.error(`Wallet Details: ${walletId}`, error);
      throw error;
    }
  }
}