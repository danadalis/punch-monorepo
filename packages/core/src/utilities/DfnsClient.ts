import { AsymmetricKeySigner } from '@dfns/sdk-keysigner'
import { DfnsApiClient, DfnsDelegatedApiClient } from '@dfns/sdk'
import dotenv from 'dotenv';


export function getDfnsClient() {
    dotenv.config();
    const dfnsUrl = process.env.DFNS_URL;
    const token = process.env.TOKEN;
    const dfnskey = process.env.DFNS_KEY;
    const appId = process.env.APP_ID;
    const credId = process.env.CRED_ID;
    const dfnsOrigenUrl = process.env.ORIGEN_URL;
    
    
    const signer = new AsymmetricKeySigner({
        privateKey: dfnskey!,
        credId: credId!,
        appOrigin: dfnsOrigenUrl!,
    })

    const dfnsApi = new DfnsApiClient({
        appId: appId!,
        authToken: token!,
        baseUrl: dfnsUrl!,
        signer,
    });

    return { dfnsApi };
}


export function getMoneriumClient(env: string) {
    return "";
}