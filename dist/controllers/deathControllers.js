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
exports.removeName = exports.getNames = exports.addName = void 0;
const errorHandler_1 = require("../utiles/errorHandler");
const deathModel_1 = __importDefault(require("../models/deathModel"));
exports.addName = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield deathModel_1.default.create({
        name: req.body.name,
        date: req.body.date,
    });
    const deaths = yield deathModel_1.default.find();
    res.status(200).json({
        status: "ok",
        data: deaths,
    });
}));
exports.getNames = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deaths = yield deathModel_1.default.find();
    res.status(200).json({
        status: "ok",
        data: deaths,
    });
}));
exports.removeName = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deaths = yield deathModel_1.default.findByIdAndDelete(req.query.id);
    res.status(204).json({});
}));
