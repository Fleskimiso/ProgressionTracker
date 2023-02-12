import Joi from "joi"
import { ILoginRequest, ISignupRequest } from "../../common/responseTypes/auth"
export const loginFormSchema = Joi.object<ILoginRequest>({
    email: Joi.string().required(),
    password: Joi.string().required()
})
export const signUpFormSchema = Joi.object<ISignupRequest>({
    email: Joi.string().required(),
    password: Joi.string().required(),
    nick: Joi.string().required()
}) 