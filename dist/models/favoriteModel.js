"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favoriteSchema = new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    englishText: {
        type: String,
        required: true,
    },
    surah: {
        type: String,
        required: true,
    },
    surahName: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Favorite = mongoose_1.default.model("Favorite", favoriteSchema);
exports.default = Favorite;
