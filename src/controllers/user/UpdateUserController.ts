import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService"


class UpdateUserController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const { id } = request.params;

        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({
            id,
            email,
            name,
            password
        });

        return response.json(classToPlain(user));

    }
}

export { UpdateUserController }