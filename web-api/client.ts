
import {io, Socket} from 'socket.io-client';
import * as config from '../app.config.json';


export class SocketClient {
    client: Socket
    cacheUpdate: ((data: any) => void) | undefined

    constructor(url: string) {
        this.client = io(url, {
            extraHeaders: {
                auth: config.AUTH_KEY
            }
        });

        this.client.on("connect_error", (e) => {
            console.log(e);
        })

        this.client.on("connect", () => {
            console.log("[AUGER-CLIENT] Connected to server!")
        })

        this.client.on("cache-update", (data: any) => {
            if(this.cacheUpdate != null) {
                this.cacheUpdate(data)
            }
        });
        
    }

    onCacheUpdate(cacheUpdate: (data: any) => void) {
        this.cacheUpdate = cacheUpdate;
    }


}

