import { Request, Response } from "express";
import { ListAllVideosService } from "../../services/video/ListAllVideosService";
import { ListOneVideoByTitleService } from "../../services/video/ListOneVideoByTitleService";



class ListAllVideosOrListVideoByTitleController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { search } = request.query;

        const title = String(search);

        const listOneByTitleVideo = new ListOneVideoByTitleService();
        const listAllVideos = new ListAllVideosService();

        if (!search) {
            const list = await listAllVideos.execute();
            return response.json(list)
        }

        const list = await listOneByTitleVideo.execute({ title });

        return response.json(list);






        return response.json(list);
    }
}

export { ListAllVideosOrListVideoByTitleController }