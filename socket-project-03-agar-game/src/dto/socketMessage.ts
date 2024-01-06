
import os from 'os';

export class SocketMsg<T> {

    private timeStamp : number;
    private entity : string;
    private entityId : string;
    private data : T;
    
    constructor(data : T){
        this.timeStamp = Date.now();
        this.entity = "SERVER";
        this.entity = os.hostname();
        this.data = data;
    }

    
}

