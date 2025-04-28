import { Collection, Db } from "mongodb";

export interface IMongoService {
    connect(): Promise<void>;
    getCollection<T>(collectionName: string): Collection<T>;
}