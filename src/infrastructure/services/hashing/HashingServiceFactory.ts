import { IHashingService } from "./interfaces/IHashingService.js";
import { EHashingType } from "./enums/EHashingType.js";
import { BcryptService } from "./BcryptService.js";
import { HashingServiceConfig } from "./config/HashingServiceConfig.js";


export class HashingServiceFactory {
    /**
     * Creates an instance of IHashingService based on the provided config.
     * - config: Configuration object for hashing service creation
     */
    static create(config: HashingServiceConfig): IHashingService {
        switch(config.hashingType) {
            case EHashingType.STANDARD:
                return new BcryptService(10);
            default:
                throw new Error("Could not create cookieservice.");
        }
    }
}