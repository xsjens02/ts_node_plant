import { Identification } from "../../domain/Identification.js";
import { EAuthRole } from "../services/tokens/enums/EAuthRole.js";

export interface JWTUserPayload extends Identification {
    name: string,
    role: EAuthRole
}