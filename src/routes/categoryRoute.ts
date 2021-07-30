import { Router } from "express";
import { CreateCategoryController } from "../controllers/category/CreateCategoryController";
import { DeleteCategoryController } from "../controllers/category/DeleteCategoryController";
import { ListAllCategoryController } from "../controllers/category/ListAllCategoryController";
import { ListAllVideosByCategoryController } from "../controllers/category/ListAllVideosByCategoryController";
import { ListOneCategoryController } from "../controllers/category/ListOneCategoryController";
import { UpdateCategoryController } from "../controllers/category/UpdateCategoryController";
import auth from '../middlewares/authenticationMeddleware';

const router = Router();

router.use(auth);
router
    .post("/categories", CreateCategoryController.handle)
    .get("/categories", ListAllCategoryController.handle)
    .get("/categories/:id", ListOneCategoryController.handle)
    .put("/categories/:id", UpdateCategoryController.handle)
    .delete("/categories/:id", DeleteCategoryController.handle)
    .get("/categories/:id/videos", ListAllVideosByCategoryController.handle)

export default router;