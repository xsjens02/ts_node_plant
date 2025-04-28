export interface ILoginController {
    login(req: any, res: any): Promise<Response>;
}