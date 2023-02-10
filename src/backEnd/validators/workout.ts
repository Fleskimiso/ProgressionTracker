import Joi from "joi";
import { IWorkoutRequest } from "../../common/responseTypes/workout";

export const workoutFormSchema = Joi.object<IWorkoutRequest>({
    day: Joi.number().required(),
    duration: Joi.string().required(),
    izometricExercises: Joi.array().items(Joi.object({
        exercise: Joi.object({
            name: Joi.string().required(),
            type: Joi.string().valid("izometric").required()
        }).required(),
        sets: Joi.array().items(Joi.object({
            weight: Joi.number().required(),
            holdsTime: Joi.array().items(Joi.number().required()).required()
        })).required()
    })),
    standardExercises: Joi.array().items(Joi.object({
        exercise: Joi.object({
            name: Joi.string().required(),
            type: Joi.string().valid("standard").required()
        }).required(),
        sets: Joi.array().items(Joi.object({
            weight: Joi.number().required(),
            repetitions: Joi.number().min(1).required()
        })).required()
    }))
})

