"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const deathSchema = new mongoose_1.default.Schema({
    name: {
        required: true,
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});
const Death = mongoose_1.default.model("Death", deathSchema);
exports.default = Death;
