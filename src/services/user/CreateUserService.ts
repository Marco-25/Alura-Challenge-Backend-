import { hash } from "bcrypt";
import { getCustomRepository } from "typeorm";
import { CustomErrors } from "../../Errors/CustomErrors";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";

interface IRequestUser {
    name: string;
    username: string;
    password: string;
    email: string;
}

class CreateUserService {

    async execute({ name, username, password, email }: IRequestUser): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        if (!name || name.length < 3) throw new CustomErrors(`the name cannot be blank and must be longer than 3 characters.`)
        if (!username) throw new CustomErrors(`username cannot be blank!`)
        if (!password) throw new CustomErrors(`password cannot be blank!`)
        if (!email) throw new CustomErrors(`email cannot be blank!`)

        const userExists = await userRepository.findOne({ username });

        if (userExists) throw new CustomErrors(`User ${username} already exists!`);


        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name,
            username,
            password: passwordHash,
            email
        });

        await userRepository.save(user);

        return user;

    }
}

export { CreateUserService }