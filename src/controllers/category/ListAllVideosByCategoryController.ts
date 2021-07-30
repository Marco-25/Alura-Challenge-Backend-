import { Request, Response } from "express";
import { ListAllVideosByCategoryService } from "../../services/category/ListAllVideosByCategoryService";
import { classToPlain } from "class-transformer";


class ListAllVideosByCategoryController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;
        const reqId = Number(id);

        const listAllVideosByCategory = new ListAllVideosByCategoryService();

        const videos = await listAllVideosByCategory.execute(reqId);

        return response.json(classToPlain(videos));
    }
}

export { ListAllVideosByCategoryController }