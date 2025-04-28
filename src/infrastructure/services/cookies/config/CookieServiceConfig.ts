import { ECookieExpire } from "../enums/ECookieExpire.js";
import { ECookieType } from "../enums/ECookieType.js";

export interface CookieServiceConfig {
    cookieType: ECookieType,
    expirationTime: ECookieExpire,
}