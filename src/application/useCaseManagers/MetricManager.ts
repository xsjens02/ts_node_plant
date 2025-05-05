import { injectable, inject } from "tsyringe";
import { IRepository } from "../../infrastructure/repositories/interfaces/IRepository.js";
import { Metric } from "../../domain/Metric.js";
import { BaseUseCaseManager } from "./BaseUseCaseManager.js";
import { IUseCaseManager } from "./interfaces/IUseCaseManager.js";

@injectable()
export class MetricManager extends BaseUseCaseManager<Metric> implements IUseCaseManager<Metric> {

    constructor(@inject('MetricRepository') metricRepo: IRepository<Metric>) {
        super(metricRepo);
    }
}