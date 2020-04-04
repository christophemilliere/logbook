import { Router } from "express";
import UserController from "./controller";

const router = Router();
//Get all users
// router.get("/", UserController.listAll);
//Get one user
router.get("/:id([0-9]+)", UserController.getOneById);
router.post("/", UserController.newUser);
router.patch("/:id([0-9]+)", UserController.editUser);
export default router;
