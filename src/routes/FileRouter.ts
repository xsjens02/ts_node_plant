import express from 'express';
import { container } from 'tsyringe';
import { IFileController } from '../infrastructure/controllers/interfaces/IFileController.js';

export function fileRoutes() {
    const router = express.Router();
    const fileController = container.resolve<IFileController>('FileController');

    router.route("/")
        .post((req, res) => fileController.upload(req, res)) 
        .delete((req, res) => fileController.delete(req, res));
    
    return router;
}