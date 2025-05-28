import { ICookieService } from "../../../services/cookies/interfaces/ICookieService.js";
import { IJWTService } from "../../../services/tokens/interfaces/IJWTService.js";
import { JWTUserPayload } from "../../../DTOs/JWTUserPayload.js";
import { BaseHandler } from "./BaseHandler.js";
import { injectable } from "tsyringe";

@injectable()
export class JWTAuthHandler extends BaseHandler {
    private cookieService: ICookieService;
    private jwtService: IJWTService; 
    private cookieName: string;
    private authLevel: number;

    /**
     * Initialize JWTAuthHandler with dependencies and config values:
     * - cookieService: handles cookie extraction from requests
     * - jwtService: verifies and decodes JWT tokens
     * - cookieName: the cookie key where the JWT token is stored
     * - authLevel: minimum authorization level required for access
     */
    constructor(
        cookieService: ICookieService, 
        jwtService: IJWTService, 
        cookieName: string, 
        authLevel: number
    ) {
        super(); 
        this.cookieService = cookieService;
        this.jwtService = jwtService;
        this.cookieName = cookieName;
        this.authLevel = authLevel;
    }

    /**
     * Handle incoming request authorization by:
     * 1. Retrieving the JWT token from cookies
     * 2. Validating the token's authenticity and expiry
     * 3. Decoding token payload and checking user's authorization level
     * 4. Returning 401 Unauthorized if any checks fail
     * 5. Otherwise, delegating to BaseHandler for further processing
     *
     * @returns boolean - true if authorized and processing continues, false otherwise
     */
    handle(req: any, res: any): boolean {
        const token = this.cookieService.getCookie<string>(req, this.cookieName);

        if (!token) {
            res.status(401).json({ error: `Token '${this.cookieName}' not found.` });
            return false;
        }

        const isValid = this.jwtService.verifyToken(token);
        if (!isValid) {
            res.status(401).json({ error: `Token '${this.cookieName}' invalid or expired.` });
            return false;
        }

        const decodedToken: JWTUserPayload = this.jwtService.decodeToken<JWTUserPayload>(token);
        if (decodedToken.role > this.authLevel) {
            res.status(401).json({ error: `Token '${this.cookieName}' has insufficient authorization.` });
            return false;
        }

        // Delegate to BaseHandler for any additional handling
        return super.handle(req, res);
    }
}