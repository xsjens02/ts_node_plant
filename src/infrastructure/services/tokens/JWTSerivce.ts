import jwt from "jsonwebtoken";
import { IJWTService } from "./interfaces/IJWTService.js";
import { ETokenExpire } from "./enums/ETokenExpire.js";


export class JWTService implements IJWTService {
    private readonly key: string;
    private readonly expirationTimeSeconds: ETokenExpire;
    private readonly signingAlgorithm: jwt.Algorithm;
    private readonly issuer: string;
    private readonly audience: string;

    constructor(key: string, expirationTimeSeconds: ETokenExpire, signingAlgortihm: jwt.Algorithm, issuer: string, audience: string) {
        this.key = key;
        this.expirationTimeSeconds = expirationTimeSeconds;
        this.signingAlgorithm = signingAlgortihm;
        this.issuer = issuer;
        this.audience = audience;
    }

    generateToken<T>(payload: T): string {
        return jwt.sign(payload as object, this.key, 
            { algorithm: this.signingAlgorithm, expiresIn: this.expirationTimeSeconds, issuer: this.issuer, audience: this.audience });
    }

    verifyToken(token: string): boolean {
        try {
            jwt.verify(token, this.key);
            return true;
        } catch (error) {
            return false;  
        }
    }

    decodeToken<T>(token: string): T | null {
        try {
            return jwt.verify(token, this.key) as T;
        } catch (error) {
            return null;
        }
    }
}