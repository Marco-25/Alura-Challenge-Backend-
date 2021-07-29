import { Router } from "express";
import AuthenticationController from "../controllers/AuthenticationController";

const router = Router();

router
    .post("/auth", AuthenticationController.handle);

export default router;