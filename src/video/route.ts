import { Router } from "express";
import VideoController from "./controller";
const router = Router();

// //Get all users
router.get("/", VideoController.listAll);
// //Get one user
router.get("/:id([0-9]+)", VideoController.getOneById);
router.post("/", VideoController.newVideo);
// // router.patch("/:id([0-9]+)", CategoryController.editCategory);
export default router;
