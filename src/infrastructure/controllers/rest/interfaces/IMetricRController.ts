import { Metric } from "../../../../domain/Metric.js";
import { IRestController } from "./IRestController.js";

export interface IMetricRController extends IRestController<Metric> {
    getAllByCustomPlant(req: any, res: any): Promise<Response>;
    getLatestByCustomPlant(req: any, res: any): Promise<Response>;
}