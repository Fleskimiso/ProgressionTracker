"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * An exercise model
 * currently defined for two types of exercises
 */
const ExerciseSchema = new mongoose_1.default.Schema({
    name: String,
    type: {
        type: String,
        enum: ["izometric", "standard"]
    }
});
ExerciseSchema.virtual("id").get(function () {
    return this._id.toString();
});
exports.ExerciseModel = mongoose_1.default.model("Exercise", ExerciseSchema);
//# sourceMappingURL=ExerciseModel.js.map