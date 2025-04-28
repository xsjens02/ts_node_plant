export interface ISignUpController {
    signAndLogin(req: any, res: any): Promise<Response>;
}