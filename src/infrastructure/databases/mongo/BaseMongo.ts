import { Identification } from "../../../domain/Identification.js";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import { IMongoService } from "./interfaces/IMongoService.js";
import { Collection, Filter, MatchKeysAndValues, ObjectId, OptionalUnlessRequiredId } from "mongodb";

export class BaseMongo<T extends Identification> implements IPersistence<T> {
    protected collection: Collection<T>
    
    constructor(mongoService: IMongoService, collectionName: string) {
       this.collection = mongoService.getCollection<T>(collectionName);
    }

    async create(entity: T): Promise<T | null> {
        const { _id, ...entityWithoutId } = entity;
        const result = await this.collection.insertOne(entityWithoutId as OptionalUnlessRequiredId<T>);
        return result.acknowledged ?  { ...entity, _id: result.insertedId } :  null;
    }

    async get(id: string): Promise<T | null> {
        const entity = await this.collection.findOne({ _id: new ObjectId(id) } as Filter<T>);
        return entity ? (entity as T) : null;
    }
    
    async getAll(): Promise<T[]> {
        const entities = await this.collection.find({}).toArray();
        return entities as T[];
    }

    async update(id: string, entity: T): Promise<boolean> {
        if (!this.objExists(new ObjectId(id))) return false;

        const { _id, ...entityWithoutId } = entity;
        const updateFields = entityWithoutId as MatchKeysAndValues<T>;

        const result = await this.collection.updateOne(
            { _id: new ObjectId(id) } as Filter<T>,
            { $set: updateFields }
        );

        return result.modifiedCount > 0;
    }

    async delete(id: string): Promise<boolean> {
        if (!this.objExists(new ObjectId(id))) return false;

        const result = await this.collection.deleteOne({ _id: new ObjectId(id) } as Filter<T>);
        return result.deletedCount > 0;
    }

    private async objExists(id: ObjectId): Promise<boolean> {
        return await this.collection.findOne({ _id: id } as Filter<T>) ? true : false;
    }
}