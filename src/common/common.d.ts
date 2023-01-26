import mongoose from "mongoose"
/**
 * Interface for Exercise Schema
 */
interface IExercise {
    id?: string  
    name: string,
    type: "izometric" | "standard"
}
/**
 * @param _id id of exercise optional
 * @param name name of exercise
 * @param type "izometric" | "standard"
 */
export type Exercise = IExercise;
export interface IWorkout {
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
export interface IModifiedWorkout extends Omit<IWorkout, "izometricExercises" | "standardExercises"> {
    izometricExercises: {
        exercise: {
            name: string,
            type: "izometric"
        },
        sets: {
            weight: number,
            holdsTime: number[]
        }[]
    }[],
    standardExercises: {
        exercise: {
            name: string,
            type: "standard"
        },
        sets: {
            weight: number,
            repetitions: number
        }[]
    }[]
}