import { Request, Response } from "express";
import { ListOneVideoService } from "../../services/video/ListOneVideoService";



class ListOneVideoController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const listOneVideo = new ListOneVideoService();

        const list = await listOneVideo.execute(id);

        return response.json(list);
    }
}

export { ListOneVideoController }