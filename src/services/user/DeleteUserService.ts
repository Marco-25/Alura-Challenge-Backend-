import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import UserRepository from "../../repositories/UserRepository";


class DeleteUserService {

    async execute(id: string): Promise<void> {

        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne(String(id));

        if (!user) throw new CustomErrors(`User not found!`);

        await userRepository.delete(String(id));

    }
}

export { DeleteUserService }