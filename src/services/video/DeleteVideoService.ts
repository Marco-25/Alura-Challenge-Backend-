import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import VideoRepository from "../../repositories/VideoRepository";



class DeleteVideoService {

    async execute(id: string): Promise<object> {
        const videoRepository = getCustomRepository(VideoRepository);

        const video = await videoRepository.findOne(String(id))

        if (!video) throw new CustomErrors(`Video not found!`);
        await videoRepository.delete(String(id))

        return { message: `Video deleted!` }

    }
}

export { DeleteVideoService }