"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const userControllers_1 = require("../controllers/userControllers");
const router = express_1.default.Router();
router.post("/signup", userControllers_1.registerUser);
router.get("/:id(\\d{12})", userControllers_1.getUserProfile);
router.post("/signin", userControllers_1.login);
router.use(authControllers_1.protect);
router.post("/signout", userControllers_1.logout);
router.get("/me", userControllers_1.getMe);
router.get("/signout", userControllers_1.logout);
router.patch("/update", userControllers_1.updateMe);
exports.default = router;
