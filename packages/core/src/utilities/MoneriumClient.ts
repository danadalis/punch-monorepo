import { BearerProfile, ClientCredentials, MoneriumClient } from '@monerium/sdk';


export function getMoneriumClient() {
    const env = process.env.ENV === "1" ? 'sandbox' : 'production';
    const clientId = process.env.MONERIUM_CLIENT_ID + ''
    const redirectUrl = process.env.MONERIUM_REDIRECT_URI + ''

    const monerium = new MoneriumClient({
        environment: env,
        clientId: clientId,
        redirectUrl: redirectUrl, 
      });
      
    return { monerium };
}
