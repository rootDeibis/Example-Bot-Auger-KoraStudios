
import {io} from 'socket.io-client';


export class SocketClient {
    client: any
    cacheUpdate: ((data: any) => void) | undefined

    constructor(url: string) {
        this.client = io(url);
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

