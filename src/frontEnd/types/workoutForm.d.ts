import { IModifiedIzometricExercise, IModifiedStandardExercise } from "../../common/common"

export interface IIzometricExercise {
    name: string
    sets: IIzometricExerciseSet[]
}
export interface IStandardExercise {
    name: string
    sets: IStandardExerciseSet[]
}
export interface IStandardExerciseSet {
    repetitions: number,
    weight: number,
}
export interface IIzometricExerciseSet {
    holdsTime: number[],
    weight: number
}

export interface IWorkoutForm {
    day: number,
    startTime: string,
    endTime: string,
    izometricExercises: IModifiedIzometricExercise[],
    standardExercises: IModifiedStandardExercise[],
    currentStandardExercise: IStandardExercise,
    currentIzometricExercise: IIzometricExercise,
    error: string,
    message: string
}
export type WorkoutFormState = IWorkoutForm

