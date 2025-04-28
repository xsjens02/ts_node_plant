import { UploadedFile } from "express-fileupload";

export interface IFileManager {
    upload(file: UploadedFile): Promise<string>;
    delete(fileURL: string): Promise<boolean>;
}