import { injectable, inject } from "tsyringe";
import { UploadedFile } from "express-fileupload";
import { IFileRController } from "./interfaces/IFileRController.js";
import { IFileManager } from "../../../application/useCaseManagers/interfaces/IFileManager.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";

@injectable()
export class FileRController implements IFileRController {
    private fileManager: IFileManager;
    private authHandler?: IHandler;

    /**
     * Inject dependencies:
     * - fileManager: handles actual file upload/delete operations
     * - authHandler: optional authorization handler for route protection
     */
    constructor(
        @inject('FileManager') fileManager: IFileManager,
        @inject('FileAuthHandler') authHandler?: IHandler
    ) {
        this.fileManager = fileManager;
        this.authHandler = authHandler;
    }

    /**
     * Upload a file (image) endpoint handler.
     * - Checks authorization first.
     * - Validates file presence in the request.
     * - Delegates upload logic to fileManager.
     * - Returns URL of uploaded image on success.
     * - Handles and responds with appropriate HTTP statuses for errors.
     */
    async upload(req: any, res: any): Promise<Response> {
        if (!await this.authorized(req, res)) return;

        try {
            const image: UploadedFile = req.files.image;
            if (!image) return res.status(400).json({ message: "No image uploaded." });

            const imageURL = await this.fileManager.upload(image);
            if (!imageURL)
                return res.status(500).json({ message: "Upload failed." });

            return res.status(200).json({ 
                message: "Upload successful.", 
                url: imageURL 
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: "Something went wrong trying to upload image." });
        }
    }

    /**
     * Delete a file endpoint handler.
     * - Checks authorization first.
     * - Validates that image URL is provided as query param.
     * - Calls fileManager to delete the file.
     * - Returns success or failure status accordingly.
     */
    async delete(req: any, res: any): Promise<Response> {
        if (!await this.authorized(req, res)) return;

        try {
            const imageURL: string = req.query.fileURL;
            if (!imageURL) return res.status(400).json({ message: "Image url is required." });

            const result = await this.fileManager.delete(imageURL);
            if (!result)
                return res.status(500).json({ message: "Delete failed." });

            return res.status(200).json({ message: "Delete successful." });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: "Something went wrong trying to delete image." });
        }
    }

    /**
     * Private helper to check if request is authorized.
     * - Returns true if no authHandler is set (open access).
     * - Otherwise delegates to authHandler's handle method.
     */
    private async authorized(req: any, res: any): Promise<boolean> {
        if (!this.authHandler) return true;
        return this.authHandler.handle(req, res);
    }
}