import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";

export class BaseRestController<T> implements IRestController<T> {
    protected useCaseManager: IUseCaseManager<T>;
    protected authHandlers: Partial<Record<keyof IRestController<T>, IHandler>>;

    constructor(
        useCaseManager: IUseCaseManager<T>, 
        authHandlers?: Partial<Record<keyof IRestController<T>, IHandler>>
    ) {
        this.useCaseManager = useCaseManager;
        this.authHandlers = authHandlers;
    }

    protected async handleRequest(
        req:any, 
        res:any, 
        methodKey: keyof IRestController<T>,
        action: (req: any) => Promise<T | T[] | boolean | null>, 
        ...validations: ((req: any) => string | null)[]
    ): Promise<Response> {
        try {
            if (this.authHandlers) {
                const handler = methodKey && this.authHandlers?.[methodKey];
                if (handler) {
                    const isAuthorized = handler.handle(req, res);
                    if (!isAuthorized) return;
                }
            }

            for (const validate of validations) {
                const validationError = validate(req);
                if (validationError) return res.status(400).json({ error: validationError });
            }

            const result = await action(req);
            if (typeof result === "boolean") {
                return result 
                    ? res.status(201).json({ message: "Operation successful!" }) 
                    : res.status(404).json({ error: "No entity found." });
            }
            if (!result) return res.status(404).json({ error: "Operation failed." });
            
            return res.status(201).json(result);
        } catch (e) {
            return res.status(500).json({ error: "Internal Server Error. "});
        }
    };

    protected validateReqId(req: any): string | null {
        return req.params.id ? null: "Entity id is required.";
    } 

    protected validateReqEntity(req: any): string | null {
        const entity: T = req.body;
        return entity ? null : "Invalid data type.";
    }
    
    async create(req: any, res: any): Promise<Response> {
        return await this.handleRequest(
            req, 
            res, 
            "create",
            async (req) => await this.useCaseManager.create(req.body), 
            this.validateReqEntity
        );
    }

    async get(req: any, res: any): Promise<Response> {
        return await this.handleRequest(
            req, 
            res, 
            "get",
            async (req) => await this.useCaseManager.get(req.params.id), 
            this.validateReqId
        );
    }

    async getAll(req: any, res: any): Promise<Response> {
        return await this.handleRequest(
            req, 
            res, 
            "getAll",
            async (req) => await this.useCaseManager.getAll()
        );
    }

    async update(req: any, res: any): Promise<Response> {
        return await this.handleRequest(
            req, 
            res, 
            "update",
            async (req) => await this.useCaseManager.update(req.params.id, req.body), 
            this.validateReqId, 
            this.validateReqEntity
        );
    }

    async delete(req: any, res: any): Promise<Response> {
        return await this.handleRequest(
            req, 
            res, 
            "delete",
            async (req) => await this.useCaseManager.delete(req.params.id), 
            this.validateReqId
        );
    }
}