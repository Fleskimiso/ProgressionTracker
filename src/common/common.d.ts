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
    duration: string,
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
 * @param day ISO string date
 */
export interface IModifiedWorkout extends Omit<IWorkout,"day" | "izometricExercises" | "standardExercises"> {
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
    }[],
    _id: string,
    day: string
}