import { IJWTService } from "./interfaces/IJWTService.js";
import { ETokenType } from "./enums/ETokenType.js";
import { JWTService } from "./JWTSerivce.js";
import { JWTServiceConfig } from "./config/JWTServiceConfig.js";

export class JWTServiceFactory {
    /**
     * Creates an instance of IJWTService according to the given config.
     * - config: Configuration object containing token type, secret key, expiration time, issuer, and audience
     * Returns an instance of IJWTService.
     * Throws an error if token type is unsupported.
     */
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