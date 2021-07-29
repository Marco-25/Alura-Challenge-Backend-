import { Request, Response } from "express";
import { UpdateVideoService } from "../../services/video/UpdateVideoService";



class UpdateVideoController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const { title, description, url, categoryId } = request.body;
        const { id } = request.params;

        const updateVideo = new UpdateVideoService();

        const video = await updateVideo.execute({
            title,
            description,
            url,
            id,
            categoryId
        });

        return response.json(video);
    }
}

export { UpdateVideoController }