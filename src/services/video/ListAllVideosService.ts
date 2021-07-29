import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import Video from "../../models/Video";
import VideoRepository from "../../repositories/VideoRepository";



class ListAllVideosService {

    async execute(): Promise<Video[]> {
        const videoRepository = getCustomRepository(VideoRepository);

        const video = await videoRepository.find();

        if (!video) throw new CustomErrors(`There are no videos registered!`)

        return video;

    }
}

export { ListAllVideosService }