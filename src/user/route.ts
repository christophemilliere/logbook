import { Router } from "express";
import UserController from "./controller";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Get all users
router.get("/", checkJwt, UserController.listAll);
//Get one user
router.get("/:id([0-9]+)", checkJwt, UserController.getOneById);
router.post("/", UserController.newUser);
router.patch("/:id([0-9]+)", checkJwt, UserController.editUser);
export default router;
