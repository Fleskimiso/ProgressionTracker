import express from "express";
import { postExercises, getExercises } from "../controllers/exercise";
import { isLoggedIn } from "../middleware";

export const exerciseRouter = express.Router();

exerciseRouter.get("/exercises", isLoggedIn, getExercises)
exerciseRouter.post("/exercises", isLoggedIn, postExercises);
