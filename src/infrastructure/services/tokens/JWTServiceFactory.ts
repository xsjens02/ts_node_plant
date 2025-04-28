import { IJWTService } from "./interfaces/IJWTService.js";
import { ETokenType } from "./enums/ETokenType.js";
import { JWTService } from "./JWTSerivce.js";
import { JWTServiceConfig } from "./config/JWTServiceConfig.js";

export class JWTServiceFactory {
    static create(config: JWTServiceConfig): IJWTService {
        switch(config.tokenType) {
            case ETokenType.STANDARD:
                return new JWTService(
                    config.secretKey,
                    config.expirationTime,
                    'HS256',
                    config.issuer,
                    config.audience
                );
            default:
                throw new Error("Could not create jwtservice.");
        }
    }
}