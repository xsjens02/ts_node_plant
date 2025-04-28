import { initApp } from './infrastructure/config/ConfigApp.js';
import { createRoutes } from './routes/MainRouter.js';

const port = 3000;

initApp().then(() => {
    const routes = createRoutes();
    routes.listen(port, () =>{
        console.log('This server is listening at port:' + port);
    });
});