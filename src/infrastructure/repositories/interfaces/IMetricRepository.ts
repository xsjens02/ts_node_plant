import { Metric } from "../../../domain/Metric.js";
import { IRepository } from "./IRepository.js";

export interface IMetricRepository extends IRepository<Metric> {
    getAllByCustomPlant(customPlantId: string): Promise<Metric[]>;
    getLatestByCustomPlant(customPlantId: string): Promise<Metric[]>;
}