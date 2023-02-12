"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpFormSchema = exports.loginFormSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginFormSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.signUpFormSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    nick: joi_1.default.string().required()
});
//# sourceMappingURL=auth.js.map