import { Request, Response } from "express";
import { ListAllUserService } from "../../services/user/ListAllUserService";
import { classToPlain } from "class-transformer";


class ListAllUserController {
    static async handle(request: Request, response: Response): Promise<Response> {

        const listAllUser = new ListAllUserService();

        const list = await listAllUser.execute();

        return response.json(classToPlain(list));
    }
}

export { ListAllUserController }