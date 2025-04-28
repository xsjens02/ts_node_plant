import { UploadedFile } from "express-fileupload";

export interface ICDNService {
    upload(file: UploadedFile): Promise<string>;
    delete(fileURL: string): Promise<boolean>;
}