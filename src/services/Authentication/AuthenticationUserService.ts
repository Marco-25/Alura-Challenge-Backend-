import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import config from "../../../config";
import { CustomErrors } from "../../Errors/CustomErrors";
import User from "../../models/User";
import UserRepository from "../../repositories/UserRepository";


interface IRequestAuthentication {
    username: string;
    password: string;
}

class AuthenticationUserService {

    async execute({ username, password }: IRequestAuthentication): Promise<object | User> {
        const userRepository = getCustomRepository(UserRepository);

        if (!username) throw new CustomErrors(`username cannot be blank!`);

        if (!password) throw new CustomErrors(`password cannot be blank!`);


        const user = await userRepository.findOne({ username });

        if (!user) throw new CustomErrors(`User not found!`);

        const verifyPassword = await compare(password, user.password);

        if (!verifyPassword) throw new CustomErrors(`Incorrect password and/or username!`);

        const token = sign({}, config.jwt.secret, {
            subject: String(user.id),
            expiresIn: config.jwt.expiresIn,
        });

        return { token: token, user: user }
    }
}

export { AuthenticationUserService }