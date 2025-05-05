import { ObjectId } from "mongodb";

export interface IoTConfig {
    customPlantId: ObjectId;
    moistureMinVal: number;
    allowedDryPeriod: number;
    requiredWater: number;
}