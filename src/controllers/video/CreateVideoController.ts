import { Request, Response } from "express";
import { CreateVideoService } from "../../services/video/CreateVideoService";



class CreateVideoController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const { title, description, url, categoryId } = request.body;

        const createVideo = new CreateVideoService();

        const video = await createVideo.execute({
            title,
            description,
            url,
            categoryId
        });

        return response.status(201).json(video);

    }
}

export { CreateVideoController }