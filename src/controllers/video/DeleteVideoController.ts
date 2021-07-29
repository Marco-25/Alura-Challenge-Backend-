import { Request, Response } from "express";
import { DeleteVideoService } from "../../services/video/DeleteVideoService";



class DeleteVideoController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const deleteVideo = new DeleteVideoService();

        const del = await deleteVideo.execute(id);

        return response.json(del);
    }
}

export { DeleteVideoController }