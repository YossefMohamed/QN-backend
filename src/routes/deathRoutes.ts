import express from "express";
import { addName, getNames } from "../controllers/deathControllers";
const router = express.Router();
router.get("/", getNames);
router.post("/", addName);
export default router;
