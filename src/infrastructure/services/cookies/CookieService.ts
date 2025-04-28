import { Request, Response } from 'express'; 
import { ICookieService } from './interfaces/ICookieService.js';
import { ECookieExpire } from './enums/ECookieExpire.js';
import { ECookieSameSite } from './enums/ECookieSameSite.js';


export class CookieService implements ICookieService {
    private maxAgeMilliseconds: ECookieExpire;
    private secure: boolean;
    private sameSite: ECookieSameSite;

    constructor(maxAgeMilliseconds: ECookieExpire, secure: boolean, sameSite: ECookieSameSite) {
        this.maxAgeMilliseconds = maxAgeMilliseconds;
        this.secure = secure;
        this.sameSite = sameSite;
    }

    createOrUpdateCookie<T>(res: Response, name: string, value: T): void {
        res.cookie(name, JSON.stringify(value), {
            maxAge: this.maxAgeMilliseconds,
            httpOnly: true,
            secure: this.secure,
            sameSite: this.sameSite
        })
    }

    assertCookie(req: Request, name: string): boolean {
        return req.cookies[name] !== undefined;
    }

    getCookie<T>(req: Request, name: string): T | null {
        const cookie = req.cookies[name];
        return cookie ? (JSON.parse(cookie) as T) : null;
    }

    resetCookie(res: Response, name: string): void {
        res.clearCookie(name);
    }
}