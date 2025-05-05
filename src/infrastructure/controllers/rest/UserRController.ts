import { injectable, inject } from "tsyringe";
import { BaseRestController } from "./BaseRestController.js";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { User } from "../../../domain/User.js";
import { IHandler } from "./handlers/interfaces/IHandler.js";
import { IRestController } from "./interfaces/IRestController.js";


@injectable()
export class UserRController extends BaseRestController<User> implements IRestController<User> {

    constructor(
        @inject('UserUseCaseManager') userManager: IUseCaseManager<User>,
        @inject('UserAuthHandlers') authHandler: Partial<Record<keyof IRestController<User>, IHandler>>
    ) {
        super(userManager, authHandler);
    }
}