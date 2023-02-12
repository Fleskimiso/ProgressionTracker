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
exports.validateWorkout = exports.deleteWorkout = exports.getWorkouts = exports.postWorkout = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = require("../models/UserModel");
const WorkoutModel_1 = require("../models/WorkoutModel");
const workout_1 = require("../validators/workout");
const postWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield UserModel_1.UserModel.findById((_a = req.session.currentUser) === null || _a === void 0 ? void 0 : _a._id);
        if (user) {
            //get user exercise list merge the type with object id type
            const userExercisesList = (yield user.populate("exercises")).exercises;
            //create a new workout 
            const newUserWorkout = new WorkoutModel_1.WorkoutModel();
            //set the data
            newUserWorkout.day = new Date(req.body.day);
            newUserWorkout.duration = req.body.duration;
            //standard exercises
            req.body.standardExercises.forEach(exercise => {
                for (let i = 0; i < userExercisesList.length; i++) {
                    if (userExercisesList[i].name === exercise.exerciseName) {
                        newUserWorkout.standardExercises.push({
                            exerciseName: userExercisesList[i].name,
                            sets: exercise.sets
                        });
                        break; //break the loop
                    }
                }
            });
            //izometric exercises
            req.body.izometricExercises.forEach(exercise => {
                for (let i = 0; i < userExercisesList.length; i++) {
                    if (userExercisesList[i].name === exercise.exerciseName) {
                        newUserWorkout.izometricExercises.push({
                            exerciseName: userExercisesList[i].name,
                            sets: exercise.sets
                        });
                        break; //break the loop
                    }
                }
            });
            //save the workout
            yield newUserWorkout.save();
            //add the workout to the user
            user.workouts.push(newUserWorkout._id);
            yield user.save();
            res.status(200).json({
                message: "Workout added successfully"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}); //
exports.postWorkout = postWorkout;
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        //find user 
        const userId = (_b = req.session.currentUser) === null || _b === void 0 ? void 0 : _b._id;
        if (userId) {
            //populate reference fields    
            let limit = 0;
            let offset = 0;
            if (req.query.limit) {
                limit = Number(req.query.limit);
            }
            if (req.query.offset) {
                offset = Number(req.query.offset);
            }
            const populatedUser = yield UserModel_1.UserModel.findById(userId).populate({
                path: "workouts",
                options: {
                    sort: { day: -1 },
                    limit: limit,
                    skip: offset,
                },
                populate: [{
                        path: "standardExercises",
                        populate: {
                            path: "exercise",
                        }
                    }, {
                        path: "izometricExercises",
                        populate: {
                            path: "exercise",
                        }
                    }],
            });
            // send the workouts even if empty
            res.status(200).json({
                workouts: (populatedUser !== null ? populatedUser.workouts : []),
            });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Error happened while getting workouts"
        });
    }
});
exports.getWorkouts = getWorkouts;
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.session.currentUser) === null || _c === void 0 ? void 0 : _c._id;
        if (userId) {
            const user = yield UserModel_1.UserModel.findById(userId);
            // check if the workout is in user array
            //to prevent from deleting other users workouts
            const workoutId = req.params.id;
            if (user && workoutId) {
                // if the user has the workout than delete
                if (user.workouts.includes(new mongoose_1.default.Types.ObjectId(workoutId))) {
                    // pull from user subcollection
                    yield UserModel_1.UserModel.findByIdAndUpdate(userId, {
                        $pull: {
                            workouts: workoutId
                        }
                    });
                    //delete from workouts collection
                    yield WorkoutModel_1.WorkoutModel.deleteOne({
                        _id: workoutId
                    });
                    //sent the success message
                    res.status(200).json({
                        message: "Workout deleted"
                    });
                }
                else {
                    //workout not found or the user is not authorized...
                    res.status(404).json({
                        message: "Workout not found"
                    });
                }
            }
        }
    }
    catch (e) {
        res.status(500).json({ message: "Internal server Error" });
    }
});
exports.deleteWorkout = deleteWorkout;
const validateWorkout = (req, res, next) => {
    const { error } = workout_1.workoutFormSchema.validate(req.body);
    if (!error) {
        return next();
    }
    res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
};
exports.validateWorkout = validateWorkout;
//# sourceMappingURL=workouts.js.map