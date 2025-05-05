import { injectable, inject } from "tsyringe";
import { IUseCaseManager } from "../../../application/useCaseManagers/interfaces/IUseCaseManager.js";
import { User } from "../../../domain/User.js";
import { JWTUserPayload } from "../../DTOs/JWTUserPayload.js";
import { ICookieService } from "../../services/cookies/interfaces/ICookieService.js";
import { IJWTService } from "../../services/tokens/interfaces/IJWTService.js";
import { ISignUpRController } from "./interfaces/ISignUpRController.js";


@injectable()
export class SignUpRController implements ISignUpRController {
    private userManager: IUseCaseManager<User>;
    private jwtService: IJWTService;
    private cookieService: ICookieService;
    private cookieName: string;

    constructor(
        @inject('UserUseCaseManager') userManager: IUseCaseManager<User>, 
        @inject('JWTService') jwtService: IJWTService, 
        @inject('CookieService') cookieService: ICookieService, 
        @inject('LoginCookieName') cookieName: string
    ) {
        this.userManager = userManager;
        this.jwtService = jwtService;
        this.cookieService = cookieService;
        this.cookieName = cookieName;
    }

    async signAndLogin(req: any, res: any): Promise<Response> {
        try {
            const user: User = req.body;
            if (!user)
                return res.status(400).json({ error: "Invalid data type." });

            const createdUser = await this.userManager.create(user);
            if (!createdUser)
                return res.status(500).json({ error: "User creating failed." });

            const payload: JWTUserPayload = {
                _id: createdUser._id,
                name: createdUser.name,
                role: createdUser.role
            }
            const token = this.jwtService.generateToken(payload);
            this.cookieService.createOrUpdateCookie(res, this.cookieName, token);
            
            return res.status(200).json({ message: "Sign up successful." });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Something went wrong trying to sign up new user." });
        }
    }
}