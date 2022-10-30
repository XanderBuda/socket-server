import dotenv from "dotenv"
import bodyParser from 'body-parser';
import cors from 'cors';

import Server from './classes/server';
import router from './routes/router';

dotenv.config()
const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de servicios
server.app.use('/', router);

server.start(() => {
    console.log(`Servidor ejecutandose en el puerto ${server.port}`);
});