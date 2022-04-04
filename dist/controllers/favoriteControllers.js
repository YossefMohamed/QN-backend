"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFav = exports.getFav = exports.addFav = void 0;
const favoriteModel_1 = __importDefault(require("../models/favoriteModel"));
const errorHandler_1 = require("../utiles/errorHandler");
exports.addFav = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyFav = yield favoriteModel_1.default.countDocuments({
        text: req.body.text,
        number: req.body.number,
        surahName: req.body.surahName,
        englishText: req.body.englishText,
        type: req.body.type,
        surah: req.body.surah || 0,
        user: req.user._id,
    });
    if (!alreadyFav) {
        const fav = yield favoriteModel_1.default.create({
            text: req.body.text,
            number: req.body.number,
            englishText: req.body.englishText,
            type: req.body.type,
            surahName: req.body.surahName,
            surah: req.body.surah || 0,
            user: req.user._id,
        });
        const favs = yield favoriteModel_1.default.find({ user: req.user._id });
        return res.status(200).json({
            status: "ok",
            data: favs,
        });
    }
    throw new Error("Already in Favorites !");
}));
exports.getFav = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favs = yield favoriteModel_1.default.find({ user: req.user._id });
    res.status(200).json({ status: "ok", data: favs });
}));
exports.removeFav = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fav = yield favoriteModel_1.default.findByIdAndDelete(req.params.id);
    const favs = yield favoriteModel_1.default.find({ user: req.user._id });
    res.status(204).json({
        status: "ok",
        data: favs,
    });
}));
