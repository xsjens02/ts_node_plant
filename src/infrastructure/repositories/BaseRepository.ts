import { Identification } from "../../domain/Identification.js";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { IPersistence } from "../databases/interfaces/persistence/IPersistence.js";
import { IRepository } from "./interfaces/IRepository.js";

export class BaseRepository<T extends Identification> implements IRepository<T>{
    // Cache service for faster data access
    protected cacheService: ICache<T>;
    // Persistence service for permanent storage
    protected persistenceService: IPersistence<T>;

    constructor(
        cacheService: ICache<T>,
        persistenceService: IPersistence<T>
    ) {
        this.cacheService = cacheService;
        this.persistenceService = persistenceService;
    }

    // Create a new entity in persistence storage
    async create(entity: T): Promise<T | null> {
        return await this.persistenceService.create(entity);
    }

    // Get entity by id, first from cache, fallback to persistence if missing
    async get(id: string): Promise<T | null> {
        const cachedEntity = await this.cacheService.get(id);
        if (cachedEntity) return cachedEntity;

        const persistenceEntity = await this.persistenceService.get(id);
        if (persistenceEntity) await this.cacheService.create(persistenceEntity);

        return persistenceEntity;
    }

    // Get all entities from persistence storage
    async getAll(): Promise<T[]> {
        return await this.persistenceService.getAll();
    }

    // Update entity in persistence, then clear cache to keep data fresh
    async update(id: string, entity: T): Promise<boolean> {
        const success = await this.persistenceService.update(id, entity);
        if (success) await this.cacheService.delete(id);
        return success;
    }

    // Delete entity from persistence, then clear cache to keep data fresh
    async delete(id: string): Promise<boolean> {
        const success = await this.persistenceService.delete(id);
        if (success) await this.cacheService.delete(id);
        return success;
    }
}