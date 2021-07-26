import { Router } from "express";
import VideoController from "../controllers/VideoController";
import auth from '../middlewares';

const router = Router()

router.use(auth)
router
    .post("/videos", VideoController.create)
    .get("/videos", VideoController.getAll)
    .get("/videos/:title", VideoController.getOne)
    .put("/videos/:id", VideoController.update)
    .delete("/videos/:id", VideoController.destroy)

export default router