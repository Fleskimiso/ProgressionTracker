import express from "express"
import { getWorkouts, postWorkout,validateWorkout } from "../controllers/workouts";
import { isLoggedIn } from "../middleware";


export const WorkoutRouter = express.Router({mergeParams: true});

WorkoutRouter.post("/workouts",validateWorkout, isLoggedIn,postWorkout)
WorkoutRouter.get("/workouts", isLoggedIn, getWorkouts);