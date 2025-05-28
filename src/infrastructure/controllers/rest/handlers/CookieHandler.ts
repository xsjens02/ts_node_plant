import { ICookieService } from "../../../services/cookies/interfaces/ICookieService.js";
import { BaseHandler } from "./BaseHandler.js";

export class CookieHandler<T> extends BaseHandler {
    private cookieName: string;
    private cookieService: ICookieService;

    /**
     * Initialize CookieHandler with required dependencies:
     * - cookieService: manages cookie verification and operations
     * - cookieName: the specific cookie key to assert on each request
     */
    constructor(cookieService: ICookieService, cookieName: string) {
        super(); 
        this.cookieService = cookieService;
        this.cookieName = cookieName;
    }

    /**
     * Validate presence and validity of the cookie in the request.
     * If cookie is missing or invalid, respond with 401 Unauthorized.
     * Otherwise, continue handling the request by calling the base handler.
     *
     * @returns boolean - true if cookie valid and processing continues, false otherwise
     */
    handle(req: any, res: any): boolean {
        const isValid = this.cookieService.assertCookie(req, this.cookieName);
        if (!isValid) {
            res.status(401).json({ error: `Cookie '${this.cookieName}' not found.` });
            return false;
        }

        // Delegate to BaseHandler for any additional handling
        return super.handle(req, res);
    }
}