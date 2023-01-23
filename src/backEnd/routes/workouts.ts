import express from "express"
import { postWorkout } from "../controllers/workouts";
import { isLoggedIn } from "../middleware";


export const WorkoutRouter = express.Router({mergeParams: true});

WorkoutRouter.post("/workouts", isLoggedIn,postWorkout)
  