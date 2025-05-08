import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { userRoutes } from './UserRouter.js';
import { loginRoutes } from './LoginRouter.js';
import { fileRoutes } from './FileRouter.js';
import { signUpRoutes } from './SignUpRouter.js';
import { customPlantRoutes } from './CustomPlantRouter.js';
import { genericPlantRoutes } from './GenericPlantRouter.js';
import { metricRoutes } from './MetricRouter.js';
import { iotConfigRoutes } from './IoTConfigRouter.js';

export function createRoutes() {
   const routes = express();

   routes.use(fileUpload());
   routes.use(cors({
      origin: '*',  
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
   routes.use(cookieParser());
   routes.use(bodyParser.urlencoded({ extended: false }));
   routes.use(bodyParser.json());

   routes.use('/api/signup', signUpRoutes());
   routes.use('/api/login', loginRoutes());
   routes.use('/api/users', userRoutes());                      
   routes.use('/api/images', fileRoutes());
   routes.use('/api/customplants', customPlantRoutes());
   routes.use('/api/genericplants', genericPlantRoutes());
   routes.use('/api/metrics', metricRoutes());
   routes.use('/api/iotconfigs', iotConfigRoutes());

   // To pick up all other endpoints
   routes.get('*', (req:any,res:any) =>{
      return res.status(404).send('no such route');
   });

   return routes;
}