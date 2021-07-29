import { hash } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";

interface IRequestUser {
    id: string;
    name?: string;
    password?: string;
    email?: string;
}


class UpdateUserService {
    async execute({ id, name, password, email }: IRequestUser): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        const userExists = await userRepository.findOne(id);
        if (!userExists) throw new CustomErrors(`User not found!`);

        if (password) {
            const passwordHash = await hash(password, 8);
            const user = userRepository.create({ name, password: passwordHash, email });
            await userRepository.update(id, user);
        }

        const user = userRepository.create({ name, email });
        await userRepository.update(id, user);


        const userUpdated = await userRepository.findOne(id);
        return userUpdated;
    }
}

export { UpdateUserService }