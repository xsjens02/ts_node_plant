import { UploadedFile } from "express-fileupload";
import { IFileManager } from "./interfaces/IFileManager.js";
import { ICDNService } from "../../infrastructure/CDN/interfaces/ICDNService.js";
import { injectable, inject } from "tsyringe";

@injectable()
export class FileManager implements IFileManager {
    private cdnService: ICDNService;

    constructor(@inject('CDNGitHubService') cdnService: ICDNService) {
        this.cdnService = cdnService;
    }

    async upload(file: UploadedFile): Promise<string> {
        return await this.cdnService.upload(file);
    }

    async delete(fileURL: string): Promise<boolean> {
        return await this.cdnService.delete(fileURL);
    }
}