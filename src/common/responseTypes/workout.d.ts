import { IExercise } from "../common"

export interface IWorkoutRequest  {
    day: Number,
    duration: string,
    izometricsExercises: {
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