
import { Request, Response } from 'express'
import { AuthenticationUserService } from '../services/Authentication/AuthenticationUserService';


class AuthenticationController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const { username, password } = request.body;

        const auth = new AuthenticationUserService();

        const data = await auth.execute({
            username,
            password
        });

        return response.json(data);
    }
}

export default AuthenticationController