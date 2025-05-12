import { initApp } from './infrastructure/config/ConfigApp.js';
import { createRoutes } from './routes/MainRouter.js';
import { setupWebSocket } from './websockets/MainSocket.js';
import http from 'http';

const port = 3000;

initApp().then(() => {
    const app = createRoutes();
    const server = http.createServer(app)

    setupWebSocket(server);

    server.listen(port, '0.0.0.0', () =>{
        console.log('This server is listening at port:' + port);
    });
});