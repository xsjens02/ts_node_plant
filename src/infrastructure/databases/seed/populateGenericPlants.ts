import { container } from "tsyringe";
import { IPersistence } from "../interfaces/persistence/IPersistence.js";
import path from "path";
import { GenericPlant } from "../../../domain/GenericPlant.js";
import fs  from "fs/promises";

export async function populateGenericPlants() {
    // const db = container.resolve<IPersistence<GenericPlant>>('GenericPlantMongo');

    // const filePath = path.resolve('./generic_plants.json');
    // const data = await fs.readFile(filePath, 'utf8');
    // const plants: GenericPlant[] = JSON.parse(data);

    // for (const plant of plants) 
    //     await db.create(plant);
} 