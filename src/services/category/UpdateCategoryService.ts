import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import Category from "../../models/Category";
import CategoryRepository from "../../repositories/CategoryRepository";


interface IRequestCategory {
    id: number;
    title?: string;
    color?: string;
}

class UpdateCategoryService {

    async execute({ title, color, id }: IRequestCategory): Promise<object | Category> {
        const categoryRepository = getCustomRepository(CategoryRepository);

        if (!title) throw new CustomErrors('Titile not be able blank!')
        if (!color) throw new CustomErrors('Color not be able blank!')

        if (title.toLowerCase() == 'livre') throw new CustomErrors("This category cannot be changed.");

        const categoryExists = await categoryRepository.findOne(Number(id));
        if (!categoryExists) throw new CustomErrors('Category not found!');

        const existsTitle = await categoryRepository.findOne({ where: { title } });
        if (existsTitle) throw new CustomErrors('this category already exists.');

        const existsColor = await categoryRepository.findOne({ where: { color } });
        if (existsColor) throw new CustomErrors('this color has already been registered');

        const category = categoryRepository.create({
            title,
            color
        });

        await categoryRepository.update(Number(id), category);

        const categoryUpdated = await categoryRepository.findOne(Number(id));

        return { message: "Successfully updated category.", category: categoryUpdated }

    }
}

export { UpdateCategoryService }