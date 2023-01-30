import express from "express";
import { getPlan, putPlan } from "../controllers/plan";
import { isLoggedIn } from "../middleware";

export const planRouter = express.Router();

planRouter.get("/plans", isLoggedIn, getPlan)
//you only modify your  current plan
planRouter.put("/plans", isLoggedIn, putPlan);
