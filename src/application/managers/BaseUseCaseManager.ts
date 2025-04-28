import { IRepository } from "../../infrastructure/repositories/interfaces/IRepository.js";
import { IUseCaseManager } from "./interfaces/IUseCaseManager.js";


export class BaseUseCaseManager<T> implements IUseCaseManager<T> {
    protected repository: IRepository<T>

    constructor(repositoryService: IRepository<T>) {
        this.repository = repositoryService;
    }

    async create(entity: T): Promise<T | null> {
        return await this.repository.create(entity);
    }

    async get(id: string): Promise<T | null> {
        return await this.repository.get(id);
    }

    async getAll(): Promise<T[]> {
        return await this.repository.getAll();
    }

    async update(id: string, entity: T): Promise<boolean> {
        return await this.repository.update(id, entity);
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }
}