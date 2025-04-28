export interface IFileController {
    upload(req: any, res: any): Promise<Response>;
    delete(req: any, res: any): Promise<Response>;
}