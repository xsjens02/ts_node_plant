import { container } from "tsyringe";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import { dirname, resolve } from "path";
import fs  from "fs/promises";
import { fileURLToPath } from "url";

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