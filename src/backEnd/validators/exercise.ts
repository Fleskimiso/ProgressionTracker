import Joi from "joi";
import { ISubmitExerciseNameRequest } from "../../common/responseTypes/workout";

export const exerciseFormSchema = Joi.object<ISubmitExerciseNameRequest>({
    name: Joi.string().required().min(1).max(100),
    type: Joi.string().valid("izometric","standard").required()
})