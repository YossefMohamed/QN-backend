"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const catchError = (fn) => {
    return (req, res, next) => {
        fn(req, res).catch((err) => next(err));
    };
};
exports.catchError = catchError;
