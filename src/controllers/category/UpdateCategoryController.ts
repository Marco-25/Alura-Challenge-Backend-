import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/category/UpdateCategoryService";



class UpdateCategoryController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const { title, color } = request.body;
        const { id } = request.params;

        const updateCategory = new UpdateCategoryService();
        const idUpdate = Number(id);

        const category = await updateCategory.execute({
            id: idUpdate,
            color,
            title
        });

        return response.json(category);
    }
}

export { UpdateCategoryController }