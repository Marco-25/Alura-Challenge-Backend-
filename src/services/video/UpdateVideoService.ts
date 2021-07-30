import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import VideoRepository from "../../repositories/VideoRepository";
import validUrl from "valid-url";
import Video from "../../models/Video";
import CategoryRepository from "../../repositories/CategoryRepository";

interface IRequestVideo {
    id: string;
    title?: string;
    description?: string;
    url?: string;
    categoryId?: number;
}


class UpdateVideoService {

    async execute({ title, description, url, id, categoryId }: IRequestVideo): Promise<object | Video> {
        const videoRepository = getCustomRepository(VideoRepository);
        const categoryRepository = getCustomRepository(CategoryRepository);

        title = title.trim();
        description = description.trim();
        url = url.trim();

        const existsVideo = await videoRepository.findOne(id);

        if (!existsVideo) throw new CustomErrors(`Video not found!`);

        if (url) {
            validUrl.isUri(url)
            throw new CustomErrors(`Url ${url} invalid!`);
        }

        const existsCategory = await categoryRepository.findOne(categoryId);

        if (!existsCategory) {
            const listCategory = await categoryRepository.find();

            const result: object = {
                message: `This category ID does not exist.`,
                categories: listCategory
            }
            throw new CustomErrors(result);
        }

        const video = videoRepository.create({
            title,
            description,
            url,
            categoryId
        });

        await videoRepository.update(id, video)

        const videoUpdated = await videoRepository.findOne(id);
        return { message: "Video updated successfully ", video: videoUpdated }
    }
}

export { UpdateVideoService }