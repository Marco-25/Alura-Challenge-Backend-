import { Router } from "express";
import { CreateVideoController } from "../controllers/video/CreateVideoController";
import { DeleteVideoController } from "../controllers/video/DeleteVideoController";
import { ListAllVideosOrListVideoByTitleController } from "../controllers/video/ListAllVideosOrListVideoByTitleController";
import { ListOneVideoController } from "../controllers/video/ListOneVideoController";
import { UpdateVideoController } from "../controllers/video/UpdateVideoController";
import auth from '../middlewares/authenticationMeddleware';

const router = Router();

router.use(auth);
router
    .post("/videos", CreateVideoController.handle)
    .get("/videos/", ListAllVideosOrListVideoByTitleController.handle)
    .get("/videos/:id", ListOneVideoController.handle)
    .put("/videos/:id", UpdateVideoController.handle)
    .delete("/videos/:id", DeleteVideoController.handle)

export default router;