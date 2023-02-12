import { NextFunction, Request, Response } from "express";
import { IErrorResponse, ILoginRequest, ILoginResponse, ISignupRequest, ISignUpResponse } from "../../common/responseTypes/auth";
import { PlanModel } from "../models/PlanModel";
import { UserModel } from "../models/UserModel";
import * as sessionTypes from "../types/session"; // import session type
import { loginFormSchema, signUpFormSchema } from "../validators/auth";


export const signup = async (req: Request<{}, {}, ISignupRequest>, res: Response<ISignUpResponse | IErrorResponse>) => {
    if (req.body.email && req.body.nick && req.body.password) { //check if they exist
        // Todo check if it's properly formatted using JOI
        try {
            const users = await UserModel.find({ email: req.body.email })
            if (users.length === 0) {
                const newUser = new UserModel({
                    email: req.body.email,
                    nick: req.body.nick,
                });
                //create a new user
                //create a new plan
                const userPlan = new PlanModel({
                    currentDay: 1,
                    workouts: []
                });
                //save the plan to the database
                await userPlan.save();
                //associate the plan with the user
                newUser.plan = userPlan._id;
                // await newUser.save();
                //save the user after registration
                const registeredUser = await UserModel.register(newUser, req.body.password);
                await registeredUser.save();
                req.login(registeredUser, (error) => {
                    if (!error) {
                        req.session.currentUser = newUser;
                        res.status(200).json({
                            _id: newUser._id.toString(), //might not be needed
                            email: newUser.email,
                            nick: newUser.nick
                        });
                    }  else {
                        res.status(500).json({ message: "Internal Server Error" });       
                    }
                });
            } else {
                res.status(409).json({
                    message: "User with this email already exists."
                });
            }
        } catch (error: any) {
            //should be catched when for example when
            //the db connections breaks during finding/saving user
            if(error?.message)  {
            res.status(500).json({ message: error?.message });
                
            }else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }

    }
}
export const login = async (req: Request<{}, {}, ILoginRequest>, res: Response<ILoginResponse | IErrorResponse>) => {
    if (req.body.email && req.body.password) {//check if they exist 
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (user) {
                req.login(user, (err) => {
                    if (!err) {
                        req.session.currentUser = user;
                        res.status(200).json({
                            _id: user._id.toString(),
                            email: user.email,
                            nick: user.nick,
                            wLength: user.workouts.length
                        })
                    } else {
                        res.status(500).json({ message: "Internal Server Error" });
                    }
                })
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }

    }
}
export const logout = async (req: Request, res: Response<IErrorResponse>) => {
    req.logout({ keepSessionInfo: false }, (err) => {
        if (err) {
             //clear the cookie on the logout
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            req.session.destroy(( Serr) =>{
                if(Serr) {
                    res.clearCookie("connect.sid")
                    res.status(500).json({ message: "Internal Server Error" });
                } else {
                    res.status(200).send();
                }
            });
        }
    })
}
export const getLoggedUser = async (req: Request, res: Response<IErrorResponse | ILoginResponse>) => {

    const user = await UserModel.findById(req.session.currentUser?._id);
    
    if (user) {
        req.session.currentUser = user;
        res.status(200).json({
            _id: user._id.toString(),
            email: user.email,
            nick: user.nick,
            wLength: user.workouts.length
        });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }

}
export const validateLogin = (req: Request<{}, {}, ILoginRequest>, res: Response<ILoginResponse | IErrorResponse>,next: NextFunction)  =>{
    const {error} = loginFormSchema.validate(req.body);
    if(!error){
     return next();
    }
    res.status(400).json({message: error?.message})

}
export const validateSignUp = (req: Request<{}, {}, ISignupRequest>, res: Response<ILoginResponse | IErrorResponse>,next: NextFunction) =>{
    const {error} = signUpFormSchema.validate(req.body);
    if(!error){
        return next();
    }
    res.status(400).json({message: error?.message});

}