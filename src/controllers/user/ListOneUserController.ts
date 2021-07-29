import { Request, Response } from "express";
import { classToPlain } from "class-transformer";
import { ListOneUserService } from "../../services/user/ListOneUserService";


class ListOneUserController {
    static async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const listOneUser = new ListOneUserService;

        const list = await listOneUser.execute(id);

        return response.json(classToPlain(list));
    }
}

export { ListOneUserController }