import { ObjectId } from "mongodb";
import { Identification } from "./Identification.js";

export interface IoTConfig extends Identification {
    customPlantId: ObjectId;
    moistureMinVal: number;
    allowedDryPeriod: number;
    requiredWater: number;
}