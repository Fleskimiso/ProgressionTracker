import Joi from "joi";
import { IPutPlanRequest } from "../../common/responseTypes/plan";


export const planFormSchema = Joi.object<IPutPlanRequest>({
    plan: Joi.object({
        currentDay: Joi.number().min(1).required(),
        workouts: Joi.array().items(Joi.object({
            _id: Joi.optional(),
            day: Joi.number().min(0).required(),
            exercises: Joi.array().items(Joi.object({
                _id: Joi.optional(),
                exercise: Joi.string().required(),
                sets: Joi.number().min(1).required()
            }))
        }))
    })
});