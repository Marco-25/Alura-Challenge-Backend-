import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/category/CreateCategoryService";



class CreateCategoryController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { title, color } = request.body;

        const categoryCreate = new CreateCategoryService();

        const category = await categoryCreate.execute({
            title,
            color
        });

        return response.status(201).json(category);
    }
}

export { CreateCategoryController }