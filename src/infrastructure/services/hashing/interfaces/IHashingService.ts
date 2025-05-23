export interface IHashingService {
    encrypt(password: string): Promise<string>;
    compare(password: string, userPassword: string): Promise<boolean>;
}