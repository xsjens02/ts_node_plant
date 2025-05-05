import { Identification } from "./Identification.js";

export interface GenericPlant extends Identification {
    commonName: string;
    latinName: string;
    description: string;
    category: string;
    moistureMinVal: number;
    allowedDryPeriod: number;
    tempMaxVal: number;
    tempMinVal: number;
}