import mongoose from "mongoose";


interface IWorkout {
    day: Date,
    duration: String,
    izometricExercises: {
        exercise: mongoose.Types.ObjectId,
        sets: {
            weight: number,
            holdsTime: number[]
        }[]
    }[],
    standardExercises: {
        exercise: mongoose.Types.ObjectId,
        sets: {
            weight: number,
            repetitions: number
        }[]
    }[]
}
/**
 *
 * Workout Schema TODO: describe it
 */
const WorkoutSchema = new mongoose.Schema<IWorkout>({
    day: Date,
    duration: String,
    izometricExercises: [
        {
            exercise: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise"
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
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise"
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