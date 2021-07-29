import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import Category from "../../models/Category";
import CategoryRepository from "../../repositories/CategoryRepository";



class ListOneCategoryService {

    async execute(id: number): Promise<Category> {
        const categoryResposity = getCustomRepository(CategoryRepository);

        const list = await categoryResposity.findOne(id);

        if (!list) throw new CustomErrors("There are no registered categories");

        return list;
    }
}

export { ListOneCategoryService }