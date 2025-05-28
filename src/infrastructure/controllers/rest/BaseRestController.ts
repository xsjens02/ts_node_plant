import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";

export class BaseRestController<T> implements IRestController<T> {
    // Use case manager handles business logic for the entity type T
    protected useCaseManager: IUseCaseManager<T>;

    // Optional authorization handlers mapped by controller method names
    protected authHandlers: Partial<Record<keyof IRestController<T>, IHandler>>;

    constructor(
        useCaseManager: IUseCaseManager<T>, 
        authHandlers?: Partial<Record<keyof IRestController<T>, IHandler>>
    ) {
        this.useCaseManager = useCaseManager;
        this.authHandlers = authHandlers;
    }

    /**
     * Centralized request handler that performs:
     * - Optional authorization check via handler for the method
     * - Validation of request data through provided validators
     * - Execution of the given action function (e.g. use case method)
     * - Sends appropriate HTTP response based on action result or errors
     */
    protected async handleRequest(
        req: any, 
        res: any, 
        methodKey: keyof IRestController<T>,
        action: (req: any) => Promise<T | T[] | boolean | null>, 
        ...validations: ((req: any) => string | null)[]
    ): Promise<Response> {
        try {
            // Authorization: run handler if present for the method
            if (this.authHandlers) {
                const handler = methodKey && this.authHandlers?.[methodKey];
                if (handler) {
                    const isAuthorized = handler.handle(req, res);
                    if (!isAuthorized) return; // stop if unauthorized
                }
            }

            // Run all validations; respond with 400 on first validation error
            for (const validate of validations) {
                const validationError = validate(req);
                if (validationError) return res.status(400).json({ error: validationError });
            }

            // Execute main action (e.g. create, get, update, delete)
            const result = await action(req);

            // If action returns boolean, interpret as success/failure response
            if (typeof result === "boolean") {
                return result 
                    ? res.status(201).json({ message: "Operation successful!" }) 
                    : res.status(404).json({ error: "No entity found." });
            }

            // If no result returned, treat as failure
            if (!result) return res.status(404).json({ error: "Operation failed." });

            // Success: return the resulting entity or entities with 201 Created
            return res.status(201).json(result);
        } catch (e) {
            // Catch all unexpected errors and return 500 Internal Server Error
            return res.status(500).json({ error: "Internal Server Error." });
        }
    };

    // Validates that the request has a parameter 'id'; returns error message or null
    protected validateReqId(req: any): string | null {
        return req.params.id ? null : "Entity id is required.";
    } 

    // Validates that the request body contains entity data; returns error message or null
    protected validateReqEntity(req: any): string | null {
        const entity: T = req.body;
        return entity ? null : "Invalid data type.";
    }
    
    // Standard CRUD methods delegate to handleRequest with appropriate validation and useCase calls

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