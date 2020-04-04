import { Router } from "express";
import VideoController from "./controller";
const router = Router();
import { checkJwt } from "../middlewares/checkJwt";

// //Get all users
router.get("/", checkJwt, VideoController.listAll);
// //Get one user
router.get("/:id([0-9]+)", checkJwt, VideoController.getOneById);
router.post("/", checkJwt, VideoController.newVideo);
// // router.patch("/:id([0-9]+)", CategoryController.editCategory);
export default router;
