import jwt from "jsonwebtoken";
import { IJWTService } from "./interfaces/IJWTService.js";
import { ETokenExpire } from "./enums/ETokenExpire.js";


export class JWTService implements IJWTService {
    private readonly key: string;
    private readonly expirationTimeSeconds: ETokenExpire;
    private readonly signingAlgorithm: jwt.Algorithm;
    private readonly issuer: string;
    private readonly audience: string;

    /**
     * Initializes the JWT service with required configuration.
     * - key: Secret key used for signing tokens
     * - expirationTimeSeconds: Token expiry time in seconds
     * - signingAlgorithm: Algorithm used for signing tokens
     * - issuer: Issuer identifier for the token
     * - audience: Intended audience for the token
     */
    constructor(key: string, expirationTimeSeconds: ETokenExpire, signingAlgortihm: jwt.Algorithm, issuer: string, audience: string) {
        this.key = key;
        this.expirationTimeSeconds = expirationTimeSeconds;
        this.signingAlgorithm = signingAlgortihm;
        this.issuer = issuer;
        this.audience = audience;
    }

    /**
     * Generates a signed JWT token for the given payload.
     * - payload: The data to embed in the token
     * Returns the signed JWT as a string.
     */
    generateToken<T>(payload: T): string {
        return jwt.sign(payload as object, this.key, 
            { algorithm: this.signingAlgorithm, expiresIn: this.expirationTimeSeconds, issuer: this.issuer, audience: this.audience });
    }

    /**
     * Verifies if the given JWT token is valid.
     * - token: The JWT token string to verify
     * Returns true if valid, false otherwise.
     */
    verifyToken(token: string): boolean {
        try {
            jwt.verify(token, this.key);
            return true;
        } catch (error) {
            return false;  
        }
    }

    /**
     * Decodes and verifies the JWT token.
     * - token: The JWT token string to decode
     * Returns the decoded payload if valid, otherwise null.
     */
    decodeToken<T>(token: string): T | null {
        try {
            return jwt.verify(token, this.key) as T;
        } catch (error) {
            return null;
        }
    }
}