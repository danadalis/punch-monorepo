import { UserSchema, User, OTPQuery, OTPResult } from './user.model';
import { DBClient } from '../../utilities/DbClient';
import { Logger } from '../../interfaces/ILogger';
import OTP from '../../utilities/OTPClient';
const { v4: uuidv4 } = require('uuid');

interface Wallet {
    id: string;
    walletid: string;
    env: string;
    status: boolean;
}


interface PGClientInterface {
    connect(): Promise<any>;
}



export class CreateUserService {
    private dbClient: DBClient;
    private otp: OTP;

    constructor(private pg: PGClientInterface, private logger: Logger) {
        this.dbClient = new DBClient(this.pg);
        this.otp = new OTP();
    }


    async createUser(user: User): Promise<any> {
        try {
            const userId = uuidv4();

            this.logger.info(userId);
            this.logger.info(`user has been created with mobile ${user.email}`);

            await this.createUserInDatabase(userId, user);
            const wallet = await this.assignWalletToUser(userId);
            this.logger.info(`wallet ${wallet.walletid} has been assigned to user ${user}`);

            return {
                phone_number: user.email,
                userid: userId,
                walletId: wallet.walletid
            };

        } catch (error) {
            console.error(error);
            this.logger.error("user creation error" + error);
            throw new Error("error : " + error);
        }
    }

    async sendOTP(otpQuery: OTPQuery) {
        const res = await this.otp.sendOtp(otpQuery.phoneNumber);
        return {
            status: res.status
        }
    }

    async verifyOtp(otpResult: OTPResult) {
        const res = await this.otp.verifyOtp(otpResult.phoneNumber, otpResult.code);
        return {
            status: res.status
        }
    }

    private async createUserInDatabase(userId: string, user: User): Promise<void> {
        const userValues = [
            userId,
            '2b0d995a-71e5-11ee-b962-0242ac120002', // Replace with actual KYC ID
            '',
            user.email,
            'user',
            '953d4bd6-71e5-11ee-b962-0242ac120002', // Replace with actual App ID
        ];

        const insertQueryUser = `
            INSERT INTO users (id, kycid, name, username, role, app_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        await this.dbClient.saveData(insertQueryUser, userValues);

    }

    private async assignWalletToUser(userId: string): Promise<Wallet> {
        const wallets = await this.dbClient.getData(`
            SELECT * FROM walletpool WHERE status = $1 LIMIT 1;
        `, [false]);

        if (wallets.rows.length === 0) {
            throw new Error('No available wallets to assign.');
        }

        const walletPoolId: Wallet = wallets.rows[0];
        const walletId = uuidv4();

        const walletValues = [
            walletId,
            '953d4bd6-71e5-11ee-b962-0242ac120002', // Replace with actual App ID
            userId,
            walletPoolId.walletid,
            true,
        ];
        const insertQueryUserWallet = `
            INSERT INTO wallet (id, appid, userid, walletid, isassigned)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        await this.dbClient.saveData(insertQueryUserWallet, walletValues);

        await this.removeWalletFromPool(walletPoolId.id);

        return walletPoolId;
    }

    private async removeWalletFromPool(walletPoolId: string): Promise<void> {
        const deleteWalletFromPool = `
            DELETE FROM walletpool WHERE id = $1 RETURNING *;
        `;

        await this.dbClient.deleteData(deleteWalletFromPool, [walletPoolId]);
        this.logger.info(`wallet ${walletPoolId} has been removed from walletpool`);

    }




}