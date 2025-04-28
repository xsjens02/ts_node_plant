import { injectable, inject } from "tsyringe";
import { IFileManager } from "../../application/managers/interfaces/IFileManager.js";
import { IFileController } from "./interfaces/IFileController.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { UploadedFile } from "express-fileupload";

@injectable()
export class FileController implements IFileController {
    private fileManager: IFileManager;
    private authHandler?: IHandler;

    constructor(
        @inject('FileManager') fileManager: IFileManager,
        @inject('FileAuthHandler') authHandler?: IHandler
    ) {
        this.fileManager = fileManager;
        this.authHandler = authHandler;
    }

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
            console.log(e);
            res.status(500).json({ error: "Something went wrong trying to upload image." });
        }
    }

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
            console.log(e);
            res.status(500).json({ error: "Something went wrong trying to delete image." });
        }
    }

    private async authorized(req: any, res: any): Promise<boolean> {
        if (!this.authHandler) return true; 

        return this.authHandler.handle(req, res);
    }
}