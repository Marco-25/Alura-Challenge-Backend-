import { Request, Response } from "express";
import { ListOneCategoryService } from "../../services/category/ListOneCategoryService";



class ListOneCategoryController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const lisCategory = new ListOneCategoryService();

        const list = await lisCategory.execute(Number(id));

        return response.json(list);
    }
}

export { ListOneCategoryController }