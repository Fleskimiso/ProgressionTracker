import { Request, Response } from "express";
import { IErrorResponse, ILoginRequest, ILoginResponse, ISignupRequest, ISignUpResponse } from "../../common/responseTypes/auth";
import { PlanModel } from "../models/PlanModel";
import { UserModel } from "../models/UserModel";
import * as sessionTypes from "../types/session"; // import session type

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
                const userPlan = new PlanModel();
                newUser.plan = userPlan._id;
                const registeredUser = await UserModel.register(newUser, req.body.password);
                await req.login(registeredUser, (error) => {
                    if (error) {
                        res.status(500).json({ message: "Internal Server Error" });
                    }
                })
                await newUser.save();
                res.status(200).json({
                    _id: newUser._id.toString(), //might not be needed
                    email: newUser.email, // same with email if it's succefull it should be on the frontend
                    nick: newUser.nick
                });
            } else {
                res.status(409).json({
                    message: "User with this email already exists."
                });
            }
        } catch (error) {
            //should be catched when for example when
            //the db connections breaks during finding/saving user
            res.status(500).json({ message: "Internal Server Error" });
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
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }

    }
}
export const logout = async (req: Request, res: Response<IErrorResponse>) => {
    req.logout({ keepSessionInfo: false }, (err) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            res.status(200).send();
        }
    })
}
export const getLoggedUser = async (req: Request, res: Response<IErrorResponse | ILoginResponse>) => {

    const user = await UserModel.findById(req.session.currentUser?._id);
    
    if (user) {
        req.session.currentUser = user;
        res.status(200).json({
            _id: req.session.currentUser._id.toString(),
            email: req.session.currentUser.email,
            nick: req.session.currentUser.nick,
            wLength: req.session.currentUser.workouts.length
        });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }

}