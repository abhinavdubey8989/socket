

import { IoManager } from './manager/ioManager';
import { Server as HttpServer } from "http";
import express from 'express';
import { config } from 'dotenv';
import { PubSubManager } from './manager/redisManager';
config();



const port:string = process.env.PORT || `4500`;


// creating an httpServer using express
const app = express();


// app.use(express.static(path.join(__dirname, '..', 'public')));
const httpServer : HttpServer = app.listen(port , async() => {
    console.log(`started on port ${port}`);

    PubSubManager.getInstance(httpServer)
});


export default httpServer;







