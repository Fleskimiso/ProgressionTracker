import Joi from "joi";
import { ISubmitExerciseNameRequest } from "../../common/responseTypes/workout";

export const exerciseFormSchema = Joi.object<ISubmitExerciseNameRequest>({
    name: Joi.string().required(),
    type: Joi.string().valid("izometric","standard").required()
})