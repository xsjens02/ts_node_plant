import { IHandler } from "./interfaces/IHandler.js";

export abstract class BaseHandler implements IHandler {
    protected nextHandler?: BaseHandler;

    setNext(handler: IHandler): IHandler {
        this.nextHandler = handler;
        return handler;
    }
    handle(req: any, res: any): boolean {
        if (this.nextHandler) {
            return this.nextHandler.handle(req, res);
        } 
        return true;
    }
}