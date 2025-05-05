import express from 'express';
import { container } from 'tsyringe';
import { IRestController } from '../infrastructure/controllers/rest/interfaces/IRestController.js';
import { User } from '../domain/User.js';

export function userRoutes() {
    const router = express.Router();
    const userController = container.resolve<IRestController<User>>('UserRController');

    router.route("/")
        .post((req, res) => userController.create(req, res)) 
        .get((req, res) => userController.getAll(req, res)); 

    router.route("/:id")
        .get((req, res) => userController.get(req, res)) 
        .put((req, res) => userController.update(req, res)) 
        .delete((req, res) => userController.delete(req, res));
    
    return router;
}