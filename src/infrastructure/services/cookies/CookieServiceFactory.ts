import { ICookieService } from "./interfaces/ICookieService.js";
import { CookieService } from "./CookieService.js";
import { ECookieSameSite } from "./enums/ECookieSameSite.js";
import { ECookieType } from "./enums/ECookieType.js";
import { CookieServiceConfig } from "./config/CookieServiceConfig.js";

export class CookieServiceFactory {
    /**
     * Creates an instance of ICookieService based on the provided config.
     * - config: Configuration object for cookie service creation
     */
    static create(config: CookieServiceConfig): ICookieService {
        switch(config.cookieType) {
            case ECookieType.STANDARD:
                return new CookieService(
                    config.expirationTime,
                    false,
                    ECookieSameSite.LAX
                );
            default:
                throw new Error("Could not create cookieservice.");
        }
    }
}