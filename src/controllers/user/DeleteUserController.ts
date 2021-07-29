import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";



class DeleteUserController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const deleteUser = new DeleteUserService();

        deleteUser.execute(id);

        return response.json("User deleted!")
    }
}

export { DeleteUserController }