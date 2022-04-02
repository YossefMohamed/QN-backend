"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authControllers_1 = require("../controllers/authControllers");
const express_1 = __importDefault(require("express"));
const commentControllers_1 = require("../controllers/commentControllers");
const router = express_1.default.Router({ mergeParams: true });
router.get("/", commentControllers_1.getComments);
router.use(authControllers_1.protect);
router.post("/", commentControllers_1.addComment);
router.patch("/:comment", commentControllers_1.editComment);
router.delete("/:comment", commentControllers_1.deleteComment);
exports.default = router;
