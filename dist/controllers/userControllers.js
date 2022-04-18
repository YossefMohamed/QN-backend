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
exports.login = exports.verfiyNumber = exports.messageSender = exports.signup = void 0;
const twilio_1 = __importDefault(require("twilio"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authGuard_1 = require("../utiles/authGuard");
const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);
exports.signup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastName, number, gender, email, password, confirmPassword, } = req.body;
    if (password !== confirmPassword) {
        res.status(400).json({
            status: "failed",
            message: "password and confirm password must be same",
        });
        return;
    }
    const user = yield userModel_1.default.create({
        name,
        lastName,
        number,
        gender,
        email,
        password,
    });
    const token = (0, authGuard_1.signIn)(user.id);
    res.status(200).json({
        status: "ok",
        data: { user, token },
    });
}));
exports.messageSender = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verCode = Math.floor(1000 + Math.random() * 9000);
        if (!mongoose_1.default.isValidObjectId(req.query.user)) {
            res.status(404).json({
                status: "failed",
                message: "Invalid ID!",
            });
            return;
        }
        const user = yield userModel_1.default.findById(req.query.user);
        if (!user) {
            res.status(404).json({
                status: "failed",
                message: "User Not Found !",
            });
            return;
        }
        // client.messages
        //   .create({
        //     body: `Your Code Is ${verCode}\n STAY SAFE :)`,
        //     messagingServiceSid: "MGcbb30f95b11a5d112df6ac104ca16f8f",
        //     to: `+2${user.number}`,
        //   })
        //   .then((message) => console.log(message.sid));
        user.code = `${verCode}`;
        yield user.save();
        res.status(200).json({
            status: "ok",
            data: { user },
        });
    }
    catch (error) {
        next(new Error(error));
    }
}));
exports.verfiyNumber = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(req.query.user)) {
        res.status(404).json({
            status: "failed",
            message: "Invalid ID!",
        });
        return;
    }
    const user = yield userModel_1.default.findById(req.query.user);
    if (!user) {
        res.status(404).json({
            status: "failed",
            message: "User Not Found !",
        });
        return;
    }
    if (user.code === req.body.code) {
        user.verified = true;
        user.code = undefined;
        yield user.save();
        res.status(200).json({
            status: "ok",
            data: { user },
        });
        return;
    }
    res.status(200).json({
        status: "failed",
        message: "Code Is Not Correct",
    });
}));
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number, password } = req.body;
    const user = yield userModel_1.default.findOne({ number });
    if (!user || !(yield user.matchPassword(password))) {
        res.status(404).json({
            status: "failed",
            message: "Number Or Password Is Incorrect",
        });
        return;
    }
    const token = (0, authGuard_1.signIn)(user.id);
    res.status(200).json({
        status: "ok",
        data: { user, token },
    });
}));
