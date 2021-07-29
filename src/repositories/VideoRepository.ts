import { EntityRepository, Repository } from "typeorm";
import Video from "../models/Video";

@EntityRepository(Video)
class VideoRepository extends Repository<Video>{ }

export default VideoRepository;
