import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import Video from "../../models/Video";
import VideoRepository from "../../repositories/VideoRepository";



class ListAllVideosByCategoryService {

    async execute(id: number): Promise<Video[]> {
        const videosRepository = getCustomRepository(VideoRepository);

        const videos = await videosRepository.find({
            where: {
                categoryId: id
            }
        });

        if (!videos) throw new CustomErrors("There are no videos in this category.");

        return videos;

    }
}

export { ListAllVideosByCategoryService }