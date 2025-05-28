import { container } from "tsyringe";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import { dirname, resolve } from "path";
import fs  from "fs/promises";
import { fileURLToPath } from "url";

/**
 * Loads data from a JSON file and populates the given persistence database.
 * - persistenceDb: The DI token name for the persistence service to resolve
 * - jsonFileName: The relative path to the JSON file with data to import
 * 
 * Reads the JSON file, parses its content into an array of entities,
 * then iterates over each item and calls create() on the persistence service.
 */
export async function populatePersistenceDb<T>(
    persistenceDb: string,
    jsonFileName: string
) {
    const db = container.resolve<IPersistence<T>>(persistenceDb);

    const currentFile = fileURLToPath(import.meta.url);
    const currentDir = dirname(currentFile);
    const fullPath = resolve(currentDir, jsonFileName);

    const data = await fs.readFile(fullPath, 'utf8');
    const items: T[] = JSON.parse(data);

    for (const item of items) 
        await db.create(item);
} 