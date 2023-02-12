"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
/**
 * User
 */
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    nick: {
        type: String,
        required: true
    },
    workouts: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Workout"
        }],
    plan: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Plan"
    },
    exercises: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Exercise"
        }]
});
UserSchema.plugin(passport_local_mongoose_1.default, { usernameField: "email" });
exports.UserModel = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=UserModel.js.map