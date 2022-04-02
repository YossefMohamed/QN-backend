import express from "express";
import { protect } from "../controllers/authControllers";
import {
  getMe,
  getUserProfile,
  login,
  logout,
  registerUser,
  updateMe,
} from "../controllers/userControllers";
const router = express.Router();

router.post("/signup", registerUser);
router.get("/:id(\\d{12})", getUserProfile);
router.post("/signin", login);

router.use(protect);
router.post("/signout", logout);
router.get("/me", getMe);
router.get("/signout", logout);
router.patch("/update", updateMe);

export default router;
