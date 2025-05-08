import { container } from "tsyringe";
import { CookieServiceFactory } from "../services/cookies/CookieServiceFactory.js";
import { ECookieExpire } from "../services/cookies/enums/ECookieExpire.js";
import { ECookieType } from "../services/cookies/enums/ECookieType.js";
import { ICookieService } from "../services/cookies/interfaces/ICookieService.js";
import { EHashingType } from "../services/hashing/enums/EHashingType.js";
import { HashingServiceFactory } from "../services/hashing/HashingServiceFactory.js";
import { IHashingService } from "../services/hashing/interfaces/IHashingService.js";
import { ETokenExpire } from "../services/tokens/enums/ETokenExpire.js";
import { ETokenType } from "../services/tokens/enums/ETokenType.js";
import { IJWTService } from "../services/tokens/interfaces/IJWTService.js";
import { JWTServiceFactory } from "../services/tokens/JWTServiceFactory.js";

export function configure() {
    // ----- JWT Setup -----
    const jwtService: IJWTService = JWTServiceFactory.create({
        tokenType: ETokenType.STANDARD,
        secretKey: process.env.TOKEN_SECRET,
        expirationTime: ETokenExpire.ONE_DAY,
        issuer: process.env.TOKEN_ISSUER,
        audience: process.env.TOKEN_AUDIENCE
    });
    container.registerInstance<IJWTService>('JWTService', jwtService);

    // ----- Cookie Setup -----
    const cookieService: ICookieService = CookieServiceFactory.create({
        cookieType: ECookieType.STANDARD,
        expirationTime: ECookieExpire.ONE_DAY,
    });
    container.registerInstance<ICookieService>('CookieService', cookieService);
    container.registerInstance<string>('LoginCookieName', process.env.LOGIN_COOKIE_NAME);

    // ----- Hashing Setup -----
    const bcryptService: IHashingService = HashingServiceFactory.create({
        hashingType: EHashingType.STANDARD,
    });
    container.registerInstance<IHashingService>('EncryptionService', bcryptService);
}