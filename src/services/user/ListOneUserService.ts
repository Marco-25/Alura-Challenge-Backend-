import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";


class ListOneUserService {

    async execute(id: string): Promise<User> {

        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne(id);

        if (!user) throw new CustomErrors("User not found!");

        return user;

    }
}

export { ListOneUserService }