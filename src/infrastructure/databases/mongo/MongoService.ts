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
        // Initialize connection parameters from injected config
        this.url = config.connectionUrl;
        this.dbName = config.databaseName;
    }

    /**
     * Connects to the MongoDB server and selects the database.
     * If already connected, it will not reconnect.
     */
    async connect(): Promise<void> {
        if (this.db) return; // Already connected

        try {
            this.client = new MongoClient(this.url);
            await this.client.connect(); // Establish connection
            this.db = this.client.db(this.dbName); // Select database
        } catch(e) {
            console.error("Error trying to connect to Mongo", e);
            throw e; 
        }
    }

    /**
     * Returns the MongoDB collection with the specified name.
     * Throws an error if the database connection has not been established.
     */
    getCollection<T>(collectionName: string): Collection<T> {
        if (!this.db) {
            throw new Error("Mongo is not connected. Please call connect() first.");
        }
        return this.db.collection<T>(collectionName);
    }
}