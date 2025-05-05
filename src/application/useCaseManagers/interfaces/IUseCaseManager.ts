export interface IUseCaseManager<T> {
    create(entity: T): Promise<T | null>;         
    get(id: string): Promise<T | null>; 
    getAll(): Promise<T[]>;             
    update(id: string, entity: T): Promise<boolean>;  
    delete(id: string): Promise<boolean>; 
}