import { Request, Response } from "express";
import { ListAllVideosService } from "../../services/video/ListAllVideosService";



class ListAllVideosController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const listAllVideos = new ListAllVideosService();

        const list = await listAllVideos.execute();

        return response.json(list);
    }
}

export { ListAllVideosController }