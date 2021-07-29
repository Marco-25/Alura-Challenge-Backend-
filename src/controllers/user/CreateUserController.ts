import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";
import { classToPlain } from "class-transformer";


class CreateUserController {
    static async handle(request: Request, response: Response): Promise<Response> {
        const { name, username, password, email } = request.body;

        const userService = new CreateUserService();

        const user = await userService.execute({
            name,
            username,
            password,
            email
        });

        return response.status(201).json(classToPlain(user));

    }
}

export { CreateUserController }