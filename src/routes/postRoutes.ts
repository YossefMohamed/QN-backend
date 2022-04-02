import { protect } from "../controllers/authControllers";
import express from "express";
import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
  likePost,
} from "../controllers/postControllers";
import multer from "multer";
import commentRoutes from "./commentRoutes";
const router = express.Router();

router.use("/:id/comment", commentRoutes);

router.get("/", getPosts);
router.get("/:id", getPost);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

router.use(protect);
router.post("/", multer({ storage: storage }).single("image"), addPost);
router.delete("/:id", deletePost);
router.patch("/:id", editPost);
router.post("/:id", likePost);
export default router;
