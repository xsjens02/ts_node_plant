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

    /**
     * Inject dependencies:
     * - userManager: handles user creation and management
     * - jwtService: generates JWT tokens for authentication
     * - cookieService: manages cookies in the HTTP response
     * - cookieName: the cookie key to store the token
     */
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

    /**
     * Handles user signup and automatically logs in the user by:
     * - validating input user data,
     * - creating a new user record,
     * - generating a JWT token,
     * - setting the token as a cookie,
     * - responding with success or error message.
     */
    async signAndLogin(req: any, res: any): Promise<Response> {
        try {
            const user: User = req.body;
            if (!user)
                return res.status(400).json({ error: "Invalid data type." });

            const createdUser = await this.userManager.create(user);
            if (!createdUser)
                return res.status(500).json({ error: "User creation failed." });

            const payload: JWTUserPayload = {
                _id: createdUser._id,
                name: createdUser.name,
                role: createdUser.role
            };

            const token = this.jwtService.generateToken(payload);
            this.cookieService.createOrUpdateCookie(res, this.cookieName, token);

            return res.status(200).json({ message: "Sign up successful." });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: "Something went wrong trying to sign up new user." });
        }
    }
}