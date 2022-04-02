import { protect } from "../controllers/authControllers";
import express from "express";
import { addFav, getFav, removeFav } from "../controllers/favoriteControllers";

const router = express.Router();
router.use(protect);

router.post("/", addFav);
router.get("/", getFav);
router.delete("/:id", removeFav);

export default router;
