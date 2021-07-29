import { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/category/DeleteCategoryService";



class DeleteCategoryController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const idDel = Number(id);

        const deleteCategory = new DeleteCategoryService();

        const del = await deleteCategory.execute(idDel);

        return response.json(del);

    }
}

export { DeleteCategoryController }