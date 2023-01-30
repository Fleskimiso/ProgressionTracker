import express, {Request, Response} from "express";
import { IPlan } from "../../common/common";
import { UserModel } from "../models/UserModel";
import {IGetPlanResponse, IPutPlanRequest} from "../../common/responseTypes/plan"
import { IErrorResponse } from "../../common/responseTypes/auth";

export const getPlan = async (req: Request, res: Response<IGetPlanResponse| IErrorResponse> ) =>{
    if(req.session.currentUser) {
        try {
            const user  = await UserModel.findById(req.session.currentUser?.id)
            .populate<{plan :IPlan}>("plan");
            if(user) {
                return res.status(200).json({
                    plan: user.plan 
                });
            } else {
                res.status(404).json({message: "plan not found"})
            }

        } catch (error) {
           res.status(500).json({message: "Internal server error"});
        }
    }
}

export const putPlan = async (req: Request<{},{},IPutPlanRequest>, res: Response<IErrorResponse> ) =>{
    if(req.session.currentUser) {
        try {
            const user  = await UserModel.findById(req.session.currentUser?.id).populate<{plan: IPlan}>("plan");
            if(user) {
                user.plan.currentDay = req.body.plan.currentDay;
                user.plan.workouts= req.body.plan.workouts;
                await user.save();
                return res.status(200).json({
                    message: "plan updated"
                });
            } else {
                res.status(404).json({message: "Plan not found"})
            }

        } catch (error) {
           res.status(500).json({message: "Plan update failed"});
        }
    }              
}