import { Router } from "express";
import CategoryController from "./controller";

const router = Router();
//Get all users
router.get("/", CategoryController.listAll);
//Get one user
router.get("/:id([0-9]+)", CategoryController.getOneById);
router.post("/", CategoryController.newCategory);
// router.patch("/:id([0-9]+)", CategoryController.editCategory);
export default router;
