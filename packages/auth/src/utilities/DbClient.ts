import fastify from 'fastify';

const server = fastify({ logger: true });


interface PGClientInterface {
    connect(): Promise<any>;
}

export class DBClient {
    constructor(private pg: PGClientInterface) { }  // The pg parameter now adheres to both Logger and PGClientInterface

    async getClient() {
        const client = await this.pg.connect();
        return client;
    }


    async saveData(query: string, values: any[]){
        try{
            const client = await this.getClient();
            const res = await client.query(query, values);
            await client.release();
            
        }catch(err)
        {
            console.log('db error: ' + err);
            throw Error("error:" + err) ;
        }

    }

    async getData(query: string, values: any[]){
        try{
            const client = await this.getClient();
            const res = await client.query(query, values);
            await client.release();
            return res;
            
        }catch(err)
        {
            console.log('db error: ' + err);
            throw Error("error:" + err) ;
        }

    }
    async deleteData(query: string, values: any[]){
        try{
            const client = await this.getClient();
            const res = await client.query(query, values);
            await client.release();
            
        }catch(err)
        {
            console.log('db error: ' + err);
            throw Error("error:" + err) ;
        }

    }

}


const dbClient = new DBClient(server.pg);
