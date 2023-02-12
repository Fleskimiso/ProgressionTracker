"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutFormSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.workoutFormSchema = joi_1.default.object({
    day: joi_1.default.number().required(),
    duration: joi_1.default.string().required(),
    izometricExercises: joi_1.default.array().items(joi_1.default.object({
        exerciseName: joi_1.default.string().disallow("").required(),
        sets: joi_1.default.array().items(joi_1.default.object({
            weight: joi_1.default.number().required(),
            holdsTime: joi_1.default.array().items(joi_1.default.number().required()).required()
        })).required()
    })),
    standardExercises: joi_1.default.array().items(joi_1.default.object({
        exerciseName: joi_1.default.string().disallow("").required(),
        sets: joi_1.default.array().items(joi_1.default.object({
            weight: joi_1.default.number().required(),
            repetitions: joi_1.default.number().min(1).required()
        })).required()
    }))
});
//# sourceMappingURL=workout.js.map