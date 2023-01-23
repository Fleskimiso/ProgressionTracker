import {Request, Response} from "express";
import {IErrorResponse, ISignupRequest, ISignUpResponse} from "../../common/responseTypes/auth";
import {UserModel} from "../models/UserModel";
import * as sessionTypes from "../types/session"; // import session type

export const signup = async (req: Request<{},{},ISignupRequest>,res: Response<ISignUpResponse | IErrorResponse>) =>{
    if(req.body.email && req.body.nick && req.body.password){ //check if they exist
       const users = await UserModel.find({ email: req.body.email})
       if(users.length === 0) {
        const newUser = new UserModel({
            email: req.body.email,
            nick: req.body.nick,
        });
        const registeredUser = await UserModel.register(newUser,req.body.password);
        await req.login(registeredUser, (error) =>{
            if(error) {
                res.status(500).json({message: "Internal Server Error"});
            }
        })
        await newUser.save();
        res.status(200).json({
            _id: newUser._id.toString(),
            email: newUser.email,
            nick: newUser.nick
        });
       }else {
            res.status(409).json({
                message: "User with this email already exists."
            });
       }
    }
}