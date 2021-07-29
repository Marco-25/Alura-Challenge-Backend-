import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import VideoRepository from "../../repositories/VideoRepository";
import validUrl from 'valid-url';
import Video from "../../models/Video";
import CategoryRepository from "../../repositories/CategoryRepository";
import Category from "../../models/Category";

interface IRequestVideo {
    title: string;
    description: string;
    url: string;
    categoryId?: number;
}


class CreateVideoService {

    async execute({ title, description, url, categoryId }: IRequestVideo): Promise<Category | Video> {
        const videoRepository = getCustomRepository(VideoRepository);
        const categoryRepository = getCustomRepository(CategoryRepository);

        if (!title) throw new CustomErrors(`title cannot be blank!`);
        if (!description) throw new CustomErrors(`description cannot be blank!`);
        if (!url) throw new CustomErrors(`url cannot be blank!`);

        if (!categoryId) categoryId = 1;

        const existsCategory = await categoryRepository.findOne(categoryId);

        if (!existsCategory) {
            const listCategory = await categoryRepository.find();

            const result: object = {
                message: `This category ID does not exist.`,
                categories: listCategory
            }
            throw new CustomErrors(result);
        }

        if (!validUrl.isUri(url)) throw new CustomErrors(`Url *** ${url.toUpperCase()} *** invalid!`);

        const existsVideo = await videoRepository.findOne({ title });

        if (existsVideo) throw new CustomErrors(`Video *** ${title.toUpperCase()} *** already exists!`);

        const video = videoRepository.create({
            title,
            description,
            url,
            categoryId
        });

        await videoRepository.save(video);

        return video;

    }
}

export { CreateVideoService }