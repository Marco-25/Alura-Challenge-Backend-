import { Router } from "express";
import { CreateVideoController } from "../controllers/video/CreateVideoController";
import { DeleteVideoController } from "../controllers/video/DeleteVideoController";
import { ListAllVideosController } from "../controllers/video/ListAllVideosController";
import { ListOneVideoController } from "../controllers/video/ListOneVideoController";
import { UpdateVideoController } from "../controllers/video/UpdateVideoController";
import auth from '../middlewares/authenticationMeddleware';

const router = Router();

router.use(auth);
router
    .post("/videos", CreateVideoController.handle)
    .get("/videos", ListAllVideosController.handle)
    .get("/videos/:title", ListOneVideoController.handle)
    .put("/videos/:id", UpdateVideoController.handle)
    .delete("/videos/:id", DeleteVideoController.handle)

export default router;