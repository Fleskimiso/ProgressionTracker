import { IGetExercisesResponse, ISubmitExerciseNameRequest } from "../../common/responseTypes/workout";
import { NextFunction, Request, Response } from "express";
import { IErrorResponse } from "../../common/responseTypes/auth";
import { UserModel } from "../models/UserModel";
import { ExerciseModel } from "../models/ExerciseModel";
import { Exercise } from "../../common/common";
import { exerciseFormSchema } from "../validators/exercise";
import { nextTick } from "process";
export const postExercises = async (req: Request<{}, {}, ISubmitExerciseNameRequest>,
    res: Response<IErrorResponse | Exercise>) => {
    try {
        if (req.session.currentUser) {
            // add a new exercise
            const newExercise = new ExerciseModel({
                name: req.body.name,
                type: req.body.type
            });
            await newExercise.save();
            //pull the user with recent data
            const currentUserDoc = await UserModel.findById(req.session.currentUser._id);
            if (currentUserDoc) {
                currentUserDoc.exercises.push(newExercise._id);
                await currentUserDoc.save();
                return res.status(200).json({
                    name: newExercise.name,
                    type: newExercise.type,
                    id: newExercise.id// TODO make this virtual method
                });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
        //message for production
        //return res.status(500).json({ message: "Unexepcted error happened during adding a new exercise name to the list" });
    }
}
export const getExercises = async (req: Request, res: Response<IGetExercisesResponse | IErrorResponse>) => {
    try {
        //todo modify it to use only one query...
        if (req.session.currentUser) {
            const currentUserDoc = await UserModel.findById(req.session.currentUser._id);
            if (currentUserDoc) {
                const exercises = (await currentUserDoc.populate<{ exercises: Exercise[] }>("exercises")).exercises;
                const exercisesToSend = exercises.map(exercise => {
                    return {
                        name: exercise.name,
                        type: exercise.type,
                        id: exercise.id //will it get called???
                    }
                })
                return res.status(200).json({
                    exercises: exercisesToSend
                });
            }
        }
        res.status(500).json({ message: "Internal server error" });
    } catch (error) {
        return res.status(500).json({ message: "Server error happened during getting exercise list" });
    }
}
export const validateExercise = (req: Request<{}, {}, ISubmitExerciseNameRequest>,
    res: Response<IErrorResponse | Exercise>, next: NextFunction) => {
        const {error} = exerciseFormSchema.validate(req.body);
        if(!error) {
            return next();
        }
        return res.status(400).json({message: error?.message});
}