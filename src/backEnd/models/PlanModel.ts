import mongoose from "mongoose";

/**
 * Interface for workout Plan Schema
 */
interface IPlan {
    currentDay: number,
    workout: {
        day: number,
        exercises: [
            {
                exercise: mongoose.Types.ObjectId,
                sets: number
            }
        ]
    }
}

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
    workout: {
        day: {
            type: Number,
            min: 1
        },
        exercises: [{
            exercise: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise"
            },
            sets: {
                type: Number,
                min: 1
            }
        }]
    }
})

export const PlanModel = mongoose.model<IPlan>("Plan", PlanSchema);