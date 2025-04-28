import { Request, Response } from 'express';

export interface ICookieService {
    createOrUpdateCookie<T>(res: Response, name: string, value: T): void;
    assertCookie(req: Request, name: string): boolean;
    getCookie<T>(req: Request, name: string): T | null;
    resetCookie(res: Response, name: string): void;
}