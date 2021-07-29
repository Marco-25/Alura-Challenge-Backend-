import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import CategoryRepository from "../../repositories/CategoryRepository";



class DeleteCategoryService {

    async execute(id: number): Promise<object> {
        const deleteCategory = getCustomRepository(CategoryRepository);

        const existsCategory = await deleteCategory.findOne(id);

        if (!existsCategory) throw new CustomErrors('Category not found!')

        await deleteCategory.delete(id);

        return { message: 'category successfully deleted' }
    }
}

export { DeleteCategoryService }