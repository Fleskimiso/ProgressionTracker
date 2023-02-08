import express from "express";
import { postExercises, getExercises,validateExercise } from "../controllers/exercise";
import { isLoggedIn } from "../middleware";

export const exerciseRouter = express.Router();

exerciseRouter.get("/exercises", isLoggedIn, getExercises)
exerciseRouter.post("/exercises",validateExercise, isLoggedIn, postExercises);
