import { injectable, inject } from "tsyringe";
import { JWTUserPayload } from "../DTOs/JWTUserPayload.js";
import { LoginReqDTO } from "../DTOs/LoginReqDTO.js";
import { ICookieService } from "../services/cookies/interfaces/ICookieService.js";
import { IJWTService } from "../services/tokens/interfaces/IJWTService.js";
import { ILoginController } from "./interfaces/ILoginController.js";
import { ILoginUser } from "../../application/useCases/interfaces/ILoginUser.js";

@injectable()
export class LoginController implements ILoginController {
    private loginManager:ILoginUser;
    private jwtService: IJWTService;
    private cookieService: ICookieService;
    private cookieName: string;

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

    async login(req: any, res: any): Promise<Response> {
        try {
            const loginReq: LoginReqDTO = req.body;
            if (!loginReq)
                return res.status(400).json({ error: "Invalid data type." });

            const user = await this.loginManager.validateLogin(loginReq.username, loginReq.password);
            if (!user)
                return res.status(401).json({ error: "Invalid username or password." });

            const payload: JWTUserPayload = {
                _id: user._id,
                name: user.name,
                role: user.role
            }
            const token = this.jwtService.generateToken(payload);
            this.cookieService.createOrUpdateCookie(res, this.cookieName, token);
            
            return res.status(200).json({ message: "Login successful." });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: "Something went wrong trying to login." });
        }
    }
}