import { Router } from "express";
import CategoryController from "./controller";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Get all users
router.get("/", checkJwt, CategoryController.listAll);
//Get one user
router.get("/:id([0-9]+)", checkJwt, CategoryController.getOneById);
router.post("/", checkJwt, CategoryController.newCategory);
// router.patch("/:id([0-9]+)", CategoryController.editCategory);
export default router;
