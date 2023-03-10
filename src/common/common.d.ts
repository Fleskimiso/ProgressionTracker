import mongoose from "mongoose"
/**
 * Interface for Exercise Schema
 */
/**
 * Interface for workout Plan Schema
 */
export interface IPlan {
    currentDay: number,
    workouts: {
        day: number,
        exercises: 
            {
                exercise: string,
                sets: number
            }[]
    }[]
}

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
        exerciseName: string,
        sets: {
            weight: number,
            holdsTime: number[]
        }[]
    }[],
    standardExercises: {
        exerciseName: string,
        sets: {
            weight: number,
            repetitions: number
        }[]
    }[]
}
/**
 * @param day ISO string date
 */
export interface IModifiedIzometricExercise {
    exerciseName: string,
    sets: {
        weight: number,
        holdsTime: number[]
    }[]
}

export interface IModifiedStandardExercise {
    exerciseName: string,
    sets: {
        weight: number,
        repetitions: number
    }[]
}

export interface IModifiedWorkout extends Omit<IWorkout,"day" | "izometricExercises" | "standardExercises"> {
    izometricExercises: IModifiedIzometricExercise[],
    standardExercises: IModifiedStandardExercise[],
    _id: string,
    day: string
}