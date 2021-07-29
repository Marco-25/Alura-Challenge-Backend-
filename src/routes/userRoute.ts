import { Router } from "express";
import { CreateUserController } from "../controllers/user/CreateUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";
import { ListAllUserController } from "../controllers/user/ListAllUserController";
import { ListOneUserController } from "../controllers/user/ListOneUserController";
import { UpdateUserController } from "../controllers/user/UpdateUserController";

import auth from '../middlewares/authenticationMeddleware';

const router = Router();

router
    .post("/users", CreateUserController.handle);

router.use(auth);
router
    .get("/users", ListAllUserController.handle)
    .get("/users/:id", ListOneUserController.handle)
    .put("/users/:id", UpdateUserController.handle)
    .delete("/users/:id", DeleteUserController.handle)

export default router