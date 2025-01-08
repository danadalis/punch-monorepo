import Twilio from 'twilio';

class OTP {
    private client: Twilio.Twilio;

    constructor() {
        this.client =  Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async sendOtp(phoneNumber: string): Promise<any> {
        try {
            const verification = await this.client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID!)
                .verifications
                .create({ to: phoneNumber, channel: 'sms' });
            return verification;
        } catch (error) {
            console.error("Error sending OTP:", error);
            throw error;
        }
    }

    async verifyOtp(phoneNumber: string, code: string): Promise<any> {
        try {
            const verificationCheck = await this.client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID!)
                .verificationChecks
                .create({ to: phoneNumber, code: code });
            return verificationCheck;
        } catch (error) {
            console.error("Error verifying OTP:", error);
            throw error;
        }
    }
}

export default OTP;
