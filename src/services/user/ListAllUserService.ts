import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";


class ListAllUserService {

    async execute(): Promise<User[]> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.find();

        if (!user) throw new CustomErrors("There are no registered users");

        return user;

    }
}

export { ListAllUserService }