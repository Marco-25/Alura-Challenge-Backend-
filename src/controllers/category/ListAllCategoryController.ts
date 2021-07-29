import { Request, Response } from "express";
import { ListAllCategoryService } from "../../services/category/ListAllCategoryService";



class ListAllCategoryController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const lisCategory = new ListAllCategoryService();

        const list = await lisCategory.execute();

        return response.json(list);
    }
}

export { ListAllCategoryController }