import { injectable, inject } from "tsyringe";
import { ILoginUser } from "../../../application/useCases/interfaces/ILoginUser.js";
import { JWTUserPayload } from "../../DTOs/JWTUserPayload.js";
import { LoginReqDTO } from "../../DTOs/LoginReqDTO.js";
import { ICookieService } from "../../services/cookies/interfaces/ICookieService.js";
import { IJWTService } from "../../services/tokens/interfaces/IJWTService.js";
import { ILoginRController } from "./interfaces/ILoginRController.js";

@injectable()
export class LoginRController implements ILoginRController {
    private loginManager: ILoginUser;
    private jwtService: IJWTService;
    private cookieService: ICookieService;
    private cookieName: string;

    /**
     * Inject dependencies:
     * - loginManager: validates user credentials
     * - jwtService: generates JWT tokens for authenticated users
     * - cookieService: manages setting auth cookies on responses
     * - cookieName: name of the cookie to store JWT token
     */
    constructor(
        @inject('LoginUserUseCase') loginManager: ILoginUser, 
        @inject('JWTService') jwtService: IJWTService, 
        @inject('CookieService') cookieService: ICookieService, 
        @inject('LoginCookieName') cookieName: string
    ) {
        this.loginManager = loginManager;
        this.jwtService = jwtService;
        this.cookieService = cookieService;
        this.cookieName = cookieName;
    }

    /**
     * Handles login requests.
     * - Validates input data presence and type.
     * - Delegates credential verification to loginManager.
     * - If valid, generates JWT token with user info as payload.
     * - Sets JWT token in a cookie on the response.
     * - Returns success or relevant error HTTP responses.
     * - Catches and logs errors, responding with generic server error if any exceptions occur.
     */
    async login(req: any, res: any): Promise<Response> {
        try {
            const loginReq: LoginReqDTO = req.body;
            if (!loginReq)
                return res.status(400).json({ error: "Invalid data type." });

            const user = await this.loginManager.validateLogin(loginReq.username, loginReq.password);
            if (!user)
                return res.status(401).json({ error: "Invalid username or password." });

            // Prepare JWT payload with essential user info
            const payload: JWTUserPayload = {
                _id: user._id,
                name: user.name,
                role: user.role
            };
            // Generate token and set it as a cookie
            const token = this.jwtService.generateToken(payload);
            this.cookieService.createOrUpdateCookie(res, this.cookieName, token);
            
            return res.status(200).json({ message: "Login successful." });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: "Something went wrong trying to login." });
        }
    }
}