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

    handle(req:any, res:any): boolean {
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

        return super.handle(req, res);
    }
}