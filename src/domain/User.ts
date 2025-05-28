import { EAuthRole } from "../infrastructure/services/tokens/enums/EAuthRole.js";
import { Identification } from "./Identification.js";

export interface User extends Identification {
    name: string;
    role: EAuthRole;
    email: string;
    userName: string;
    password?: string; 
}