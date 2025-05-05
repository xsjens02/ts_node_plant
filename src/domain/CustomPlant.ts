import { ObjectId } from "mongodb";
import { GenericPlant } from "./GenericPlant.js";
import { Identification } from "./Identification.js";
import { Metric } from "./Metric.js";

export interface CustomPlant extends Identification {
    genericPlantId: ObjectId;
    genericPlant: GenericPlant;
    name: string;
    potVolume: number;
    requiredWater: number;
    latestMetric: Metric;
}