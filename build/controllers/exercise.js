"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExercise = exports.deleteExercise = exports.getExercises = exports.postExercises = void 0;
const UserModel_1 = require("../models/UserModel");
const ExerciseModel_1 = require("../models/ExerciseModel");
const exercise_1 = require("../validators/exercise");
const mongoose_1 = __importDefault(require("mongoose"));
const postExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.currentUser) {
            // add a new exercise
            const newExercise = new ExerciseModel_1.ExerciseModel({
                name: req.body.name,
                type: req.body.type
            });
            yield newExercise.save();
            //pull the user with recent data
            const currentUserDoc = yield UserModel_1.UserModel.findById(req.session.currentUser._id);
            if (currentUserDoc) {
                currentUserDoc.exercises.push(newExercise._id);
                yield currentUserDoc.save();
                return res.status(200).json({
                    name: newExercise.name,
                    type: newExercise.type,
                    id: newExercise.id // TODO make this virtual method
                });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        //message for production
        //return res.status(500).json({ message: "Unexepcted error happened during adding a new exercise name to the list" });
    }
});
exports.postExercises = postExercises;
const getExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //todo modify it to use only one query...
        if (req.session.currentUser) {
            const currentUserDoc = yield UserModel_1.UserModel.findById(req.session.currentUser._id);
            if (currentUserDoc) {
                const exercises = (yield currentUserDoc.populate("exercises")).exercises;
                const exercisesToSend = exercises.map(exercise => {
                    return {
                        name: exercise.name,
                        type: exercise.type,
                        id: exercise.id //will it get called???
                    };
                });
                return res.status(200).json({
                    exercises: exercisesToSend
                });
            }
        }
        res.status(500).json({ message: "Internal server error" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error happened during getting exercise list" });
    }
});
exports.getExercises = getExercises;
const deleteExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.currentUser) {
            const currentUserDoc = yield UserModel_1.UserModel.findById(req.session.currentUser._id);
            if (currentUserDoc && req.params.id) {
                if (currentUserDoc.exercises.includes(new mongoose_1.default.Types.ObjectId(req.params.id))) {
                    yield UserModel_1.UserModel.findByIdAndUpdate(req.session.currentUser, {
                        $pull: {
                            exercises: req.params.id
                        }
                    });
                    yield ExerciseModel_1.ExerciseModel.deleteOne({
                        _id: req.params.id
                    });
                    return res.status(200).send();
                }
            }
        }
    }
    catch (e) {
        return res.status(500).json({ message: "Server error happened during deleting exercise" });
    }
});
exports.deleteExercise = deleteExercise;
const validateExercise = (req, res, next) => {
    const { error } = exercise_1.exerciseFormSchema.validate(req.body);
    if (!error) {
        return next();
    }
    return res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
};
exports.validateExercise = validateExercise;
//# sourceMappingURL=exercise.js.map