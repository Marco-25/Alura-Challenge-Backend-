import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import Category from "../../models/Category";
import CategoryRepository from "../../repositories/CategoryRepository";


interface IReuestCategory {
    title: string;
    color: string;
}

class CreateCategoryService {

    async execute({ title, color }: IReuestCategory): Promise<Category> {
        const categoryRepository = getCustomRepository(CategoryRepository);

        if (!title) throw new CustomErrors("title not be able brank!");
        if (!color) throw new CustomErrors("title not be able brank!");

        const existsTitle = await categoryRepository.findOne({ where: { title } });

        if (existsTitle) throw new CustomErrors("Category already exists!");

        const category = categoryRepository.create({
            title,
            color
        });

        await categoryRepository.save(category);

        return category;

    }
}

export { CreateCategoryService }