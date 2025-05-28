import { ICookieService } from "../../../services/cookies/interfaces/ICookieService.js";
import { IJWTService } from "../../../services/tokens/interfaces/IJWTService.js";
import { BaseHandler } from "./BaseHandler.js";

export class JWTHandler extends BaseHandler {
    private tokenName: string;
    private cookieService: ICookieService;
    private jwtService: IJWTService; 

    /**
     * Initialize JWTHandler with required services and token name
     * - cookieService: manages retrieval of cookies from requests
     * - jwtService: verifies authenticity of JWT tokens
     * - tokenName: cookie key where JWT token is stored
     */
    constructor(cookieService: ICookieService, jwtService: IJWTService, tokenName: string) {
        super(); 
        this.cookieService = cookieService;
        this.jwtService = jwtService;
        this.tokenName = tokenName;
    }

    /**
     * Handle authorization by:
     * 1. Extracting the token from cookies
     * 2. Validating the token's authenticity and expiry
     * 3. Returning 401 Unauthorized response if token is missing or invalid
     * 4. Delegating to BaseHandler for further processing if valid
     *
     * @returns boolean - true if token is valid and processing should continue, false otherwise
     */
    handle(req: any, res: any): boolean {
        const token = this.cookieService.getCookie<string>(req, this.tokenName);

        if (!token) {
            res.status(401).json({ error: `Token '${this.tokenName}' not found.` });
            return false;
        }
    
        const isValid = this.jwtService.verifyToken(token);
        if (!isValid) {
            res.status(401).json({ error: `Token '${this.tokenName}' invalid or expired.` });
            return false;
        }

        // Continue handling in base class
        return super.handle(req, res);
    }
}