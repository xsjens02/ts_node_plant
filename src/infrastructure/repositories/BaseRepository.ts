import { Identification } from "../../domain/Identification.js";
import { ICache } from "../databases/interfaces/cache/ICache.js";
import { IPersistence } from "../databases/interfaces/persistence/IPersistence.js";
import { IRepository } from "./interfaces/IRepository.js";

export class BaseRepository<T extends Identification> implements IRepository<T>{
    protected cacheService: ICache<T>;
    protected persistenceService: IPersistence<T>;

    constructor(
        cacheService: ICache<T>,
        persistenceService: IPersistence<T>
    ) {
        this.cacheService = cacheService;
        this.persistenceService = persistenceService;
    }

    async create(entity: T): Promise<T | null> {
        return await this.persistenceService.create(entity);
    }

    async get(id: string): Promise<T | null> {
        const cahcedEntity = await this.cacheService.get(id);
        if (cahcedEntity) return cahcedEntity;

        const persistenceEntity = await this.persistenceService.get(id);
        if (persistenceEntity) await this.cacheService.create(persistenceEntity);

        return persistenceEntity;
    }

    async getAll(): Promise<T[]> {
        return await this.persistenceService.getAll();
    }

    async update(id: string, entity: T): Promise<boolean> {
        const succes = await this.persistenceService.update(id, entity);
        if (succes) await this.cacheService.delete(id);
        return succes; 
    }

    async delete(id: string): Promise<boolean> {
        const succes = await this.persistenceService.delete(id);
        if (succes) await this.cacheService.delete(id);
        return succes;
    }
    
} 