import { hash } from "bcrypt";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";


class UserController {


    static async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        try {
            const { name, username, password, email } = request.body;
            if (!name) response.status(400).json({ error: `name cannot be blank!` });
            if (!username) response.status(400).json({ error: `username cannot be blank!` });
            if (!password) response.status(400).json({ error: `password cannot be blank!` });
            if (!email) response.status(400).json({ error: `email cannot be blank!` });

            const existsUser = await userRepository.findOne({ username });
            if (existsUser) {
                return response.status(400).json({ error: `User ${username} already exists!` });
            }

            const passwordHash = await hash(password, 8)

            const user = userRepository.create({ name, username, password: passwordHash, email });
            await userRepository.save(user);
            //@ts-ignore
            delete user.password
            response.status(201).json(user)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }

    }

    static async getAll(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        try {
            const user = await userRepository.find()
            //@ts-ignore
            delete user.password
            response.status(200).json(user)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    static async getOne(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { id } = request.params
        try {
            const user = await userRepository.findOne(String(id))
            if (!user) {
                return response.status(400).json({ error: `User not found!` });
            }

            response.status(200).json(user)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    static async update(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { id } = request.params
        try {
            const { name, username, password, email } = request.body;
            const existsUser = await userRepository.findOne(id);
            if (!existsUser) {
                return response.status(400).json({ error: `User not found!` });
            }
            const passwordHash = await hash(password, 8)
            if (password) {
                const user = { name, username, password: passwordHash, email }
                await userRepository.update(id, user)
            } else {
                const user = request.body
                await userRepository.update(id, user)
            }

            const userUpdated = await userRepository.findOne(id);
            response.status(200).json({ message: "User updated successfully ", userUpdated })

        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    static async destroy(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { id } = request.params
        try {
            const user = await userRepository.findOne(String(id))
            if (!user) {
                return response.status(400).json({ message: `User not found!` })
            }
            await userRepository.delete(String(id))
            response.status(200).json({ message: `User deleted!` })
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

}

export default UserController