import Joi from "joi";
import { IWorkoutRequest } from "../../common/responseTypes/workout";

export const workoutFormSchema = Joi.object<IWorkoutRequest>({
    day: Joi.number().required(),
    duration: Joi.string().required(),
    izometricExercises: Joi.array().items(Joi.object({
        exerciseName: Joi.string().disallow("").required(),
        sets: Joi.array().items(Joi.object({
            weight: Joi.number().required(),
            holdsTime: Joi.array().items(Joi.number().required()).required()
        })).required()
    })),
    standardExercises: Joi.array().items(Joi.object({
        exerciseName: Joi.string().disallow("").required(),
        sets: Joi.array().items(Joi.object({
            weight: Joi.number().required(),
            repetitions: Joi.number().min(1).required()
        })).required()
    }))
})

