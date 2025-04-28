import { ETokenExpire } from "../enums/ETokenExpire.js";
import { ETokenType } from "../enums/ETokenType.js";

export interface JWTServiceConfig {
    tokenType: ETokenType;
    secretKey: string;
    expirationTime: ETokenExpire;
    issuer: string;
    audience: string;
}