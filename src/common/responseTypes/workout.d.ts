import { IExercise } from "../common"

export interface IWorkoutRequest  {
    day: number,
    duration: string,
    izometricExercises: {
        name: string,
        sets: {
            weight: number,
            holdsTime: number[]
        }[]
    }[],
    standardExercises: {
        name: string,
        sets: {
            weight: number,
            repetitions: number
        }[]
    }[]
}
export interface ISubmitExerciseNameRequest extends IExercise{}
export interface IGetExercisesResponse {
    exercises: IExercise[]
}