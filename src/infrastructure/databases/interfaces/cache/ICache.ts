export interface ICache<T> {
    create(entity: T): Promise<T | null>;         
    get(id: string): Promise<T | null>; 
    delete(id: string): Promise<boolean>; 
}