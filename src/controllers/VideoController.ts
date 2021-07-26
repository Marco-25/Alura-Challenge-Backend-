import { hash } from "bcrypt";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import VideoRepository from "../repositories/VideoRepository";

import validUrl from 'valid-url';

class VideoController {


    static async create(request: Request, response: Response) {
        const videoRepository = getCustomRepository(VideoRepository);

        try {
            const { title, description, url } = request.body;
            if (!title) response.status(400).json({ error: `title cannot be blank!` });
            if (!description) response.status(400).json({ error: `description cannot be blank!` });
            if (!url) response.status(400).json({ error: `url cannot be blank!` });

            if (!validUrl.isUri(url)) {
                return response.status(400).json({ error: `Url ${url} invalid!` });
            }

            const existsVideo = await videoRepository.findOne({ title });
            if (existsVideo) {
                return response.status(400).json({ error: `Video ${title} already exists!` });
            }


            const video = videoRepository.create({ title, description, url });
            await videoRepository.save(video);
            response.status(201).json(video)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }

    }

    static async getAll(request: Request, response: Response) {
        const videoRepository = getCustomRepository(VideoRepository);

        try {
            const video = await videoRepository.find()
            response.status(200).json(video)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    static async getOne(request: Request, response: Response) {
        const videoRepository = getCustomRepository(VideoRepository);
        const { title } = request.params
        try {
            const video = await videoRepository.findOne({ where: { title: title } })
            if (!video) {
                return response.status(400).json({ error: `Video not found!` });
            }
            response.status(200).json(video)
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    static async update(request: Request, response: Response) {
        const videoRepository = getCustomRepository(VideoRepository);
        const { id } = request.params
        try {
            const { title, description, url } = request.body;
            const existsVideo = await videoRepository.findOne(id);
            if (!existsVideo) {
                return response.status(400).json({ error: `Video not found!` });
            }

            if (!validUrl.isUri(url)) {
                return response.status(400).json({ error: `Url ${url} invalid!` });
            }

            const video = { title, description, url }
            await videoRepository.update(id, video)



            const videoUpdated = await videoRepository.findOne(id);
            response.status(200).json({ message: "Video updated successfully ", videoUpdated })

        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

    static async destroy(request: Request, response: Response) {
        const videoRepository = getCustomRepository(VideoRepository);
        const { id } = request.params
        try {
            const video = await videoRepository.findOne(String(id))
            if (!video) {
                return response.status(400).json({ message: `Video not found!` })
            }
            await videoRepository.delete(String(id))
            response.status(200).json({ message: `Video deleted!` })
        } catch (error) {
            response.status(500).json({ error: error.message })
        }
    }

}

export default VideoController