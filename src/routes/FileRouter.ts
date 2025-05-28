import express from 'express';
import { container } from 'tsyringe';
import { IFileRController } from '../infrastructure/controllers/rest/interfaces/IFileRController.js';

export function fileRoutes() {
    const router = express.Router();

    // Resolve the file controller using dependency injection
    const fileController = container.resolve<IFileRController>('FileRController');

    // Route: /api/images
    // Handles file uploads and deletions
    router.route("/")
        .post((req, res) => fileController.upload(req, res))   // Upload a new file (e.g., image)
        .delete((req, res) => fileController.delete(req, res)); // Delete an existing file
    
    return router;
}