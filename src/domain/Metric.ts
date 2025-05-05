import { ObjectId } from "mongodb";
import { Identification } from "./Identification.js";

export interface Metric extends Identification {
    customPlantId: ObjectId;
    dateTimeStamp: string;
    moistureLevel: number;
    temperatur: number;
    waterLevel: string;
    lastWatered: string;
}