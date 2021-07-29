import { Router } from "express";
import { CreateCategoryController } from "../controllers/category/CreateCategoryController";
import { ListAllCategoryController } from "../controllers/category/ListAllCategoryController";
import { ListOneCategoryController } from "../controllers/category/ListOneCategoryController";
import auth from '../middlewares/authenticationMeddleware';

const router = Router();

router.use(auth);
router
    .post("/categories", CreateCategoryController.handle)
    .get("/categories", ListAllCategoryController.handle)
    .get("/categories/:id", ListOneCategoryController.handle)
// .put("/categories/:id", UpdateVideoController.handle)
// .delete("/categories/:id", DeleteVideoController.handle)

export default router;