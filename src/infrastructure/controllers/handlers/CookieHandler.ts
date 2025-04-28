import { ICookieService } from "../../services/cookies/interfaces/ICookieService.js";
import { BaseHandler } from "./BaseHandler.js";

export class CookieHandler<T> extends BaseHandler {
    private cookieName: string;
    private cookieService: ICookieService;

    constructor(cookieService: ICookieService, cookieName: string) {
        super(); 
        this.cookieService = cookieService;
        this.cookieName = cookieName;
    }

    handle(req:any, res:any): boolean {
        const isValid = this.cookieService.assertCookie(req, this.cookieName)
        if(!isValid) {
            res.status(401).json({ error: `Cookie '${this.cookieName}' not found.` });
            return false;
        }

        return super.handle(req, res);
    }
}