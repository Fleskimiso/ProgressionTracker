import mongoose from "mongoose";
import { IPlan } from "../../common/common";



/**
 * A Workout schedule 
 * contains list of exercises for a given day (1st, 2nd and so on)
 * 
 */
const PlanSchema = new mongoose.Schema<IPlan>({
    currentDay: {
        type: Number,
        min: 1
    },
    workouts: [{
        day: {
            type: Number,
            min: 1
        },
        exercises: [{
            exercise: {
                type: "string",
                required: true,
            },
            sets: {
                type: Number,
                min: 1,
                required: false
            }
        }]
    }]
})

export const PlanModel = mongoose.model<IPlan>("Plan", PlanSchema);