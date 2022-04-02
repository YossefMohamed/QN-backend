"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authControllers_1 = require("../controllers/authControllers");
const express_1 = __importDefault(require("express"));
const postControllers_1 = require("../controllers/postControllers");
const multer_1 = __importDefault(require("multer"));
const commentRoutes_1 = __importDefault(require("./commentRoutes"));
const router = express_1.default.Router();
router.use("/:id/comment", commentRoutes_1.default);
router.get("/", postControllers_1.getPosts);
router.get("/:id", postControllers_1.getPost);
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});
router.use(authControllers_1.protect);
router.post("/", (0, multer_1.default)({ storage: storage }).single("image"), postControllers_1.addPost);
router.delete("/:id", postControllers_1.deletePost);
router.patch("/:id", postControllers_1.editPost);
router.post("/:id", postControllers_1.likePost);
exports.default = router;
