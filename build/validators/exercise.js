"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseFormSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.exerciseFormSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(1).max(100),
    type: joi_1.default.string().valid("izometric", "standard").required()
});
//# sourceMappingURL=exercise.js.map