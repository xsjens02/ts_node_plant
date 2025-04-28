import { ICookieService } from "../../services/cookies/interfaces/ICookieService.js";
import { IJWTService } from "../../services/tokens/interfaces/IJWTService.js";
import { BaseHandler } from "./BaseHandler.js";

export class JWTHandler extends BaseHandler {
    private tokenName: string;
    private cookieService: ICookieService;
    private jwtService: IJWTService; 

    constructor(cookieService: ICookieService, jwtService: IJWTService, tokenName: string) {
        super(); 
        this.cookieService = cookieService;
        this.jwtService = jwtService;
        this.tokenName = tokenName;
    }

    handle(req:any, res:any): boolean {
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

        return super.handle(req, res);
    }
}