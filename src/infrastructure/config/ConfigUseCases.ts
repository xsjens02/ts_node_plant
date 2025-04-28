import { container } from "tsyringe";
import { UserManager } from "../../application/managers/UserManager.js";
import { ILoginUser } from "../../application/useCases/interfaces/ILoginUser.js";
import { LoginUser } from "../../application/useCases/LoginUser.js";
import { IUseCaseManager } from "../../application/managers/interfaces/IUseCaseManager.js";
import { Product } from "../../domain/Product.js";
import { ProductManager } from "../../application/managers/ProductManager.js";
import { User } from "../../domain/User.js";
import { IFileManager } from "../../application/managers/interfaces/IFileManager.js";
import { FileManager } from "../../application/managers/FileManager.js";

export function configure() {
    // ----- Manager Instances -----
    container.registerSingleton<IUseCaseManager<User>>('UserUseCaseManager', UserManager);
    container.registerSingleton<IUseCaseManager<Product>>('ProductUseCaseManager', ProductManager);
    container.registerSingleton<IFileManager>('FileManager', FileManager);

    // ----- Use Case Instances -----
    container.registerSingleton<ILoginUser>('LoginUserUseCase', LoginUser);
}