import { UploadedFile } from "express-fileupload";
import { IFileManager } from "./interfaces/IFileManager.js";
import { ICDNService } from "../../infrastructure/CDN/interfaces/ICDNService.js";
import { injectable, inject } from "tsyringe";

@injectable()
export class FileManager implements IFileManager {
    // Service for interacting with the CDN
    private cdnService: ICDNService;

    // Injects the CDN service 
    constructor(@inject('CDNGitHubService') cdnService: ICDNService) {
        this.cdnService = cdnService;
    }

    // Uploads a file to the CDN and returns the file URL
    async upload(file: UploadedFile): Promise<string> {
        return await this.cdnService.upload(file);
    }

    // Deletes a file from the CDN by its URL
    async delete(fileURL: string): Promise<boolean> {
        return await this.cdnService.delete(fileURL);
    }
}