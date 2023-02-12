"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 *
 * Workout Schema TODO: describe it
 */
const WorkoutSchema = new mongoose_1.default.Schema({
    day: Date,
    duration: String,
    izometricExercises: [
        {
            exerciseName: {
                type: String,
                required: true
            },
            sets: [{
                    holdsTime: [{
                            type: Number,
                            min: 0
                        }],
                    weight: {
                        type: Number,
                    },
                }]
        }
    ],
    standardExercises: [{
            exerciseName: {
                type: String,
                required: true
            },
            sets: [{
                    repetitions: {
                        type: Number,
                        min: 0
                    },
                    weight: {
                        type: Number,
                    },
                }]
        }]
});
exports.WorkoutModel = mongoose_1.default.model("Workout", WorkoutSchema);
//# sourceMappingURL=WorkoutModel.js.map