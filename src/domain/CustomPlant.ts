import { ObjectId } from "mongodb";
import { GenericPlant } from "./GenericPlant.js";
import { Identification } from "./Identification.js";
import { Metric } from "./Metric.js";

export interface CustomPlant extends Identification {
    genericPlant: GenericPlant;
    userId: ObjectId;
    name: string;
    imageUrl: string;
    potVolume: number;
    requiredWater: number;
    latestMetric?: Metric;
}