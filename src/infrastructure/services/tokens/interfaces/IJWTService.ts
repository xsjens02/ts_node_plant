export interface IJWTService {
    generateToken<T>(payload: T): string;
    verifyToken(token: string): boolean;
    decodeToken<T>(token: string): T | null;
}