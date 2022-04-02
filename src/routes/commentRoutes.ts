import { protect } from "../controllers/authControllers";
import express from "express";
import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from "../controllers/commentControllers";
const router = express.Router({ mergeParams: true });

router.get("/", getComments);
router.use(protect);
router.post("/", addComment);
router.patch("/:comment", editComment);
router.delete("/:comment", deleteComment);

export default router;
