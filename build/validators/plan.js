"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planFormSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.planFormSchema = joi_1.default.object({
    plan: joi_1.default.object({
        currentDay: joi_1.default.number().min(1).required(),
        workouts: joi_1.default.array().items(joi_1.default.object({
            _id: joi_1.default.optional(),
            day: joi_1.default.number().min(0).required(),
            exercises: joi_1.default.array().items(joi_1.default.object({
                _id: joi_1.default.optional(),
                exercise: joi_1.default.string().required(),
                sets: joi_1.default.number().min(1).required()
            }))
        }))
    })
});
//# sourceMappingURL=plan.js.map