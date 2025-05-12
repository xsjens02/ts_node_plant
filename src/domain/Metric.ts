import { ObjectId } from "mongodb";
import { Identification } from "./Identification.js";

export interface Metric extends Identification {
    customPlantId: ObjectId;
    dateTimeStamp: Date;
    moistureLevel: number;
    waterLevel: string;
    lastWatered: Date;
}