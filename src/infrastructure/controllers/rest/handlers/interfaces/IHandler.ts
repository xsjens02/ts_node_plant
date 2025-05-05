export interface IHandler {
    setNext(handler: IHandler): IHandler;
    handle(req:any, res:any): boolean;
}