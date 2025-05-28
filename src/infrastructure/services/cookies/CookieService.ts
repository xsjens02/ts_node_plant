import { Request, Response } from 'express'; 
import { ICookieService } from './interfaces/ICookieService.js';
import { ECookieExpire } from './enums/ECookieExpire.js';
import { ECookieSameSite } from './enums/ECookieSameSite.js';


export class CookieService implements ICookieService {
    private maxAgeMilliseconds: ECookieExpire;
    private secure: boolean;
    private sameSite: ECookieSameSite;

    /**
     * Initializes the cookie service.
     * - maxAgeMilliseconds: Cookie expiration time in milliseconds
     * - secure: Flag indicating if cookie is HTTPS only
     * - sameSite: SameSite attribute for cookie policy
     */
    constructor(maxAgeMilliseconds: ECookieExpire, secure: boolean, sameSite: ECookieSameSite) {
        this.maxAgeMilliseconds = maxAgeMilliseconds;
        this.secure = secure;
        this.sameSite = sameSite;
    }

    /**
     * Creates or updates a cookie with JSON-serialized value.
     * Sets HttpOnly, secure, and sameSite options.
     */
    createOrUpdateCookie<T>(res: Response, name: string, value: T): void {
        res.cookie(name, JSON.stringify(value), {
            maxAge: this.maxAgeMilliseconds,
            httpOnly: true,
            secure: this.secure,
            sameSite: this.sameSite
        });
    }

    /**
     * Checks if the cookie with the given name exists in the request.
     */
    assertCookie(req: Request, name: string): boolean {
        return req.cookies[name] !== undefined;
    }

    /**
     * Retrieves and parses a cookie value by name from the request.
     * Returns null if cookie is not found.
     */
    getCookie<T>(req: Request, name: string): T | null {
        const cookie = req.cookies[name];
        return cookie ? (JSON.parse(cookie) as T) : null;
    }

    /**
     * Clears the cookie with the given name from the response.
     */
    resetCookie(res: Response, name: string): void {
        res.clearCookie(name);
    }
}