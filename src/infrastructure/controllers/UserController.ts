import { injectable, inject } from "tsyringe";
import { User } from "../../domain/User.js";
import { BaseController } from "./BaseController.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IController } from "./interfaces/IController.js";
import { IUseCaseManager } from "../../application/managers/interfaces/IUseCaseManager.js";

@injectable()
export class UserController extends BaseController<User> implements IController<User> {

    constructor(
        @inject('UserUseCaseManager') userManager: IUseCaseManager<User>,
        @inject('UserAuthHandlers') authHandler: Partial<Record<keyof IController<User>, IHandler>>
    ) {
        super(userManager, authHandler);
    }
}