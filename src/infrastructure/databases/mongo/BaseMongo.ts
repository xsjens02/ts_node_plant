import { Identification } from "../../../domain/Identification.js";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import { IMongoService } from "./interfaces/IMongoService.js";
import { Collection, Filter, MatchKeysAndValues, ObjectId, OptionalUnlessRequiredId } from "mongodb";

export class BaseMongo<T extends Identification> implements IPersistence<T> {
    // MongoDB collection instance for the entity type T
    protected collection: Collection<T>;
    
    /**
     * Initializes the MongoDB collection for the given entity type.
     * - mongoService: Service providing access to MongoDB collections
     * - collectionName: Name of the MongoDB collection to use
     */
    constructor(mongoService: IMongoService, collectionName: string) {
        this.collection = mongoService.getCollection<T>(collectionName);
    }

    /**
     * Inserts a new entity into the MongoDB collection.
     * Excludes the _id field since MongoDB generates it.
     * Returns the inserted entity with the new _id or null if failed.
     */
    async create(entity: T): Promise<T | null> {
        const { _id, ...entityWithoutId } = entity;
        const result = await this.collection.insertOne(entityWithoutId as OptionalUnlessRequiredId<T>);
        return result.acknowledged ? { ...entity, _id: result.insertedId } : null;
    }

    /**
     * Retrieves an entity by its MongoDB ObjectId string.
     * Returns the entity or null if not found.
     */
    async get(id: string): Promise<T | null> {
        const entity = await this.collection.findOne({ _id: new ObjectId(id) } as Filter<T>);
        return entity ? (entity as T) : null;
    }
    
    /**
     * Returns all entities from the collection.
     */
    async getAll(): Promise<T[]> {
        const entities = await this.collection.find({}).toArray();
        return entities as T[];
    }

    /**
     * Updates an entity by id with the provided entity data.
     * Returns true if update was successful, false otherwise.
     */
    async update(id: string, entity: T): Promise<boolean> {
        if (!await this.objExists(new ObjectId(id))) return false;

        const { _id, ...entityWithoutId } = entity;
        const updateFields = entityWithoutId as MatchKeysAndValues<T>;

        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) } as Filter<T>,
            { $set: updateFields }
        );

        return result.modifiedCount > 0;
    }

    /**
     * Deletes an entity by id.
     * Returns true if deletion was successful, false otherwise.
     */
    async delete(id: string): Promise<boolean> {
        if (!await this.objExists(new ObjectId(id))) return false;

        const result = await this.collection.deleteOne({ _id: new ObjectId(id) } as Filter<T>);
        return result.deletedCount > 0;
    }

    /**
     * Helper method to check if an entity exists by its ObjectId.
     */
    private async objExists(id: ObjectId): Promise<boolean> {
        return (await this.collection.findOne({ _id: id } as Filter<T>)) ? true : false;
    }
}