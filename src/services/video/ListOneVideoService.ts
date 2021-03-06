import { getCustomRepository, Like } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import Video from "../../models/Video";
import VideoRepository from "../../repositories/VideoRepository";




class ListOneVideoService {

    async execute(id: string): Promise<Video> {
        const videoRepository = getCustomRepository(VideoRepository);

        const video = await videoRepository.findOne(id);

        if (!video) throw new CustomErrors(`Video not found!`);

        return video;

    }

}

export { ListOneVideoService }