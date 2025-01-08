import axios from 'axios';
import { DBClient } from '../../utilities/DbClient';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../../interfaces/ILogger';

interface WalletResponse {
  result: WalletResult;
}

interface WalletResult {
  id: string;
  network: string;
  signingKey: SigningKey;
  address: string;
  status: string;
  name: string;
  tags: string[];
  dateCreated: string;
}

interface SigningKey {
  scheme: string;
  curve: string;
  publicKey: string;
}

interface ApiPostBody {
  name: string;
  env: string;
}

interface PGClientInterface {
  connect(): Promise<void>;
  // Additional methods as needed.
}


const config = {
  headers: {
    'x-api-key': process.env.APIKEY,
    'Content-Type': 'application/json',
  },
};

const formatDate = (): string => {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}${month}${day}`;
};

const generateRandomSixDigitNumber = (): string => {
  return Math.floor(10000000 + Math.random() * 9000000000).toString();
};

const generateWalletName = (): string => {
  const dateStr = formatDate();
  const randomNum = generateRandomSixDigitNumber();
  return `punch-${dateStr}-${randomNum}`;
};

export class AddWalletToPoolService {
  private dbClient: DBClient;

  constructor(private pg: PGClientInterface, private logger: Logger) {
    this.dbClient = new DBClient(pg);
  }

  async addWalletToPool(url: string, env: string): Promise<WalletResponse[] | void> {
    const walletResponses: WalletResponse[] = [];

    this.logger.info("starting wallet pool");

    for (let i = 0; i < 10; i++) {
      const postData: ApiPostBody = {
        name: generateWalletName(),
        env, // Assuming 'env' is passed as a function argument
      };

      console.log(`Sending request ${i + 1}:`, postData);

      try {
        const response = await axios.post<WalletResponse>(url, postData, config);
        const { id: walletId } = response.data.result;
        
        console.log(`Response for request ${i + 1}:`, response);

        const newUuid = uuidv4();
        const values = [newUuid, walletId, postData.env, false];

        const INSERT_QUERY = `
          INSERT INTO walletPool (id, walletid, env, status)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;

        await this.dbClient.saveData(INSERT_QUERY, values);
        console.log(`Saved wallet ${postData.name}`);
        this.logger.info(`Saved wallet ${postData.name}`);

        walletResponses.push(response.data);

      } catch (error) {
        console.error(`Request ${i + 1} failed:`, error);
        this.logger.error(`Request ${i + 1} failed:`, error);

        throw new Error(`Request ${i + 1} failed: ${error}`);
      }
    }

    

    if (walletResponses.length > 0) {
      return walletResponses;
    }
  }
}
