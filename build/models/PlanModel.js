"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * A Workout schedule
 * contains list of exercises for a given day (1st, 2nd and so on)
 *
 */
const PlanSchema = new mongoose_1.default.Schema({
    currentDay: {
        type: Number,
        min: 1
    },
    workouts: [{
            day: {
                type: Number,
                min: 1
            },
            exercises: [{
                    exercise: {
                        type: "string",
                        required: true,
                    },
                    sets: {
                        type: Number,
                        min: 1,
                        required: false
                    }
                }]
        }]
});
exports.PlanModel = mongoose_1.default.model("Plan", PlanSchema);
//# sourceMappingURL=PlanModel.js.map