"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutRouter = void 0;
const express_1 = __importDefault(require("express"));
const workouts_1 = require("../controllers/workouts");
const middleware_1 = require("../middleware");
exports.WorkoutRouter = express_1.default.Router({ mergeParams: true });
exports.WorkoutRouter.post("/workouts", workouts_1.validateWorkout, middleware_1.isLoggedIn, workouts_1.postWorkout);
exports.WorkoutRouter.get("/workouts", middleware_1.isLoggedIn, workouts_1.getWorkouts);
exports.WorkoutRouter.delete("/workouts/:id", middleware_1.isLoggedIn, workouts_1.deleteWorkout);
//# sourceMappingURL=workouts.js.map