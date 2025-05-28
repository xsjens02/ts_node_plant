import { IRepository } from "../../infrastructure/repositories/interfaces/IRepository.js";
import { IUseCaseManager } from "./interfaces/IUseCaseManager.js";


export class BaseUseCaseManager<T> implements IUseCaseManager<T> {
    // The repository that handles data operations
    protected repository: IRepository<T>

    constructor(repositoryService: IRepository<T>) {
        this.repository = repositoryService;
    }

    // Create a new entity
    async create(entity: T): Promise<T | null> {
        return await this.repository.create(entity);
    }

    // Get a single entity by its ID
    async get(id: string): Promise<T | null> {
        return await this.repository.get(id);
    }

    // Get all entities
    async getAll(): Promise<T[]> {
        return await this.repository.getAll();
    }

    // Update an entity by its ID
    async update(id: string, entity: T): Promise<boolean> {
        return await this.repository.update(id, entity);
    }

    // Delete an entity by its ID
    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }
}