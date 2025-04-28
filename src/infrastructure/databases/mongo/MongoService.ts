import { Collection, Db, MongoClient } from "mongodb";
import { IMongoService } from "./interfaces/IMongoService.js";
import { MongoConfig } from "./config/MongoConfig.js";
import { inject, injectable } from "tsyringe";

@injectable()
export class MongoService implements IMongoService {
    private client?: MongoClient;
    private db?: Db;
    private url: string;
    private dbName: string;

    constructor(@inject('MongoConfig') config: MongoConfig) {
        this.url = config.connectionUrl;
        this.dbName = config.databaseName;
    }

    async connect(): Promise<void> {
        if (this.db) return;

        try {
            this.client = new MongoClient(this.url);
            await this.client.connect();
            this.db = this.client.db(this.dbName);
        } catch(e) {
            console.error("Error trying to connect to Mongo", e);
            throw e;
        }
    }

    getCollection<T>(collectionName: string): Collection<T> {
        if (!this.db) {
            throw new Error("Mongo is not connected. Please call connect() first.");
        }
        return this.db.collection<T>(collectionName);
    }
}