import express from "express";
import { getPlan, putPlan } from "../controllers/plan";
import { isLoggedIn } from "../middleware";

export const planRouter = express.Router();

planRouter.get("/plan", isLoggedIn, getPlan)
//you only modify your  current plan
planRouter.put("/exercises", isLoggedIn, putPlan);
