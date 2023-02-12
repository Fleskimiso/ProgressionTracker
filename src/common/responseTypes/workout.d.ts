import { IExercise, IModifiedIzometricExercise, IModifiedStandardExercise, IModifiedWorkout, IWorkout } from "../common"

export interface IWorkoutRequest  {
    day: number,
    duration: string,
    izometricExercises: IModifiedIzometricExercise[],
    standardExercises: IModifiedStandardExercise[]
}
export interface ISubmitExerciseNameRequest extends IExercise{}
export interface IGetExercisesResponse {
    exercises: IExercise[]
}
export interface IWorkoutResponse {
    workouts: IModifiedWorkout[]
}
export interface IDeleteWorkoutRequest {
    id: string
}