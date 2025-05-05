import { IUseCaseManager } from "./IUseCaseManager.js";
import { Metric } from "../../../domain/Metric.js";

export interface IMetricManager extends IUseCaseManager<Metric>{
    getAllPlantMetrics(customPlantId: string): Promise<Metric[]>;
    getLatestPlantMetrics(customPlantId: string): Promise<Metric[]>;
}