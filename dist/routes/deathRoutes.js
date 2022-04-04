"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deathControllers_1 = require("../controllers/deathControllers");
const router = express_1.default.Router();
router.get("/", deathControllers_1.getNames);
router.post("/", deathControllers_1.addName);
exports.default = router;
