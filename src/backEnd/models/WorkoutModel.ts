import mongoose from "mongoose";


interface IWorkout {
    day: Date,
    duration: String,
    izometricsExercises: [
        exercise: mongoose.Types.ObjectId,
        additionalWeight: number,
        sets: [
            holdTime: [number]
        ]
    ],
    standardExercises: [
        exercise: mongoose.Types.ObjectId,
        additionalWeight: number,
        sets: [{
            repetitions: number
        }]
    ]
}
/**
 *
 * Workout Schema TODO: describe it
 */
const WorkoutSchema = new mongoose.Schema<IWorkout>({
    day: Date,
    duration: String,
    izometricsExercises: [
        {
            exercise: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise"
            },
            additionalWeight: {
                type: Number,
                min: 0
            },
            sets: [{
                holdTime: [{
                    type: Number,
                    min: 0
                }]
            }]
        }
    ],
    standardExercises: [{
        exercise: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise"
        },
        additionalWeight: {
            type: Number,
            min: 0
        },
        sets: [{
            repetitions: {
                type: Number,
                min: 0
            }
        }]
    }]
})

export const WorkoutModel = mongoose.model<IWorkout>("Workout", WorkoutSchema);