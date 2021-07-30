import { getCustomRepository, Like } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import Video from "../../models/Video";
import VideoRepository from "../../repositories/VideoRepository";


interface IRequestVideo {
    title: string;
}

class ListOneVideoByTitleService {

    async execute({ title }: IRequestVideo): Promise<Video[]> {
        const videoRepository = getCustomRepository(VideoRepository);

        const video = await videoRepository.find({ where: { title: Like(`%${title}%`) } })
        if (!video) throw new CustomErrors(`Video not found!`);

        return video;

    }

}

export { ListOneVideoByTitleService }