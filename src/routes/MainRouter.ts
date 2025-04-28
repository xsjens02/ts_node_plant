import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { userRoutes } from './UserRouter.js';
import { productRoutes } from './ProductRouter.js';
import { loginRoutes } from './LoginRouter.js';
import { fileRoutes } from './FileRouter.js';
import { signUpRoutes } from './SignUpRouter.js';

export function createRoutes() {
   const routes = express();

   routes.use(fileUpload());
   routes.use(cors());
   routes.use(cookieParser())
   routes.use(bodyParser.urlencoded({ extended: false }));
   routes.use(bodyParser.json())

   routes.use('/api/signup', signUpRoutes());
   routes.use('/api/login', loginRoutes());
   routes.use('/api/users', userRoutes());                      
   routes.use('/api/products', productRoutes());
   routes.use('/api/images', fileRoutes())

   // To pick up all other endpoints
   routes.get('*', (req:any,res:any) =>{
      return res.status(404).send('no such route');
   });

   return routes;
}