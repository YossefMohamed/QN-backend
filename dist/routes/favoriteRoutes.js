"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authControllers_1 = require("../controllers/authControllers");
const express_1 = __importDefault(require("express"));
const favoriteControllers_1 = require("../controllers/favoriteControllers");
const router = express_1.default.Router();
router.use(authControllers_1.protect);
router.post("/", favoriteControllers_1.addFav);
router.get("/", favoriteControllers_1.getFav);
router.delete("/:id", favoriteControllers_1.removeFav);
exports.default = router;
