import { compare } from 'bcrypt';
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

class AuthenticationController {

    static async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { username, password } = request.body;

        if (!username) {
            return response.status(404).json({ message: `username cannot be blank!` })
        }

        if (!password) {
            return response.status(404).json({ message: `password cannot be blank!` })
        }

        const user = await userRepository.findOne({ username });
        if (!user) {
            return response.status(404).json({ message: `User not found!` })
        }

        const verifyPassword = await compare(password, user.password);
        if (!verifyPassword) {
            return response.status(404).json({ message: `Incorrect password and/or username!` })
        }
        const token = sign({}, `0cb3d05e8b338bb9113a1a05b2470790`, {
            subject: String(user.id),
            expiresIn: '1d',
        });

        //@ts-ignore
        delete user.password
        return response.status(201).json({ token, user })

    }
}

export default AuthenticationController