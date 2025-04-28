export interface IController<T> {
    create(req: any, res: any): Promise<Response>;
    get(req: any, res: any): Promise<Response>;
    getAll(req: any, res: any): Promise<Response>;
    update(req: any, res: any): Promise<Response>;
    delete(req: any, res: any): Promise<Response>;
}