"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseRouter = void 0;
const express_1 = __importDefault(require("express"));
const exercise_1 = require("../controllers/exercise");
const middleware_1 = require("../middleware");
exports.exerciseRouter = express_1.default.Router();
exports.exerciseRouter.get("/exercises", middleware_1.isLoggedIn, exercise_1.getExercises);
exports.exerciseRouter.post("/exercises", exercise_1.validateExercise, middleware_1.isLoggedIn, exercise_1.postExercises);
exports.exerciseRouter.delete("/exercises/:id", middleware_1.isLoggedIn, exercise_1.deleteExercise);
//# sourceMappingURL=exercise.js.map