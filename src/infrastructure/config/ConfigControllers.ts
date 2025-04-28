import { container } from "tsyringe";
import { ProductController } from "../controllers/ProductController.js";
import { UserController } from "../controllers/UserController.js";
import { IController } from "../controllers/interfaces/IController.js";
import { User } from "../../domain/User.js";
import { Product } from "../../domain/Product.js";
import { ILoginController } from "../controllers/interfaces/ILoginController.js";
import { LoginController } from "../controllers/LoginController.js";
import { IFileController } from "../controllers/interfaces/IFileController.js";
import { FileController } from "../controllers/FileController.js";
import { ISignUpController } from "../controllers/interfaces/ISignUpController.js";
import { SignUpController } from "../controllers/SignUpController.js";

export function configure() {
    // ----- Controller Instances -----
    container.registerSingleton<ISignUpController>('SignUpController', SignUpController);
    container.registerSingleton<ILoginController>('LoginController', LoginController);
    container.registerSingleton<IController<User>>('UserController', UserController);
    container.registerSingleton<IController<Product>>('ProductController', ProductController);
    container.registerSingleton<IFileController>('FileController', FileController);
}