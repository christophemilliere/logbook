import { Router } from "express";
import ListFamilyController from "./controller";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Get all users
router.get("/", checkJwt, ListFamilyController.listAll);
//Get one user
router.get("/:id([0-9]+)", checkJwt, ListFamilyController.getOneById);
router.post("/", checkJwt, ListFamilyController.newCategory);
router.get("/lists", checkJwt, ListFamilyController.allCategory);
// router.patch("/:id([0-9]+)", CategoryController.editCategory);
export default router;
