import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import Category from "../../models/Category";
import CategoryRepository from "../../repositories/CategoryRepository";



class ListAllCategoryService {

    async execute(): Promise<Category[]> {
        const categoryResposity = getCustomRepository(CategoryRepository);

        const list = await categoryResposity.find();

        if (!list) throw new CustomErrors("There are no registered categories");

        return list;
    }
}

export { ListAllCategoryService }