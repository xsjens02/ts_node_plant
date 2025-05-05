import { Metric } from "../../../../domain/Metric.js";
import { IPersistence } from "./IPersistence.js";

export interface IMetricPersistence extends IPersistence<Metric> {
    getAllByCustomPlant(customPlantId: string): Promise<Metric[]>;
    getLatestByCustomPlant(customPlantId: string): Promise<Metric[]>;
}