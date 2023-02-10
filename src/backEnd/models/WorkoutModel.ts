import mongoose from "mongoose";
import { IWorkout } from "../../common/common";

/**
 *
 * Workout Schema TODO: describe it
 */
const WorkoutSchema = new mongoose.Schema<IWorkout>({
    day: Date,
    duration: String,
    izometricExercises: [
        {
            exerciseName: {
                type: String,
                required: true
            },
            sets: [{
                holdsTime: [{
                    type: Number,
                    min: 0
                }],
                weight: {
                    type: Number,
                },
            }]
        }
    ],
    standardExercises: [{
        exerciseName: {
            type: String,
            required: true
        },

        sets: [{
            repetitions: {
                type: Number,
                min: 0
            },
            weight: {
                type: Number,
            },
        }]
    }]
})

export const WorkoutModel = mongoose.model<IWorkout>("Workout", WorkoutSchema);