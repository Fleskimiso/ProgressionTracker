interface IIzometricExercise {
    name: string
    sets: {
        holdTime: number[]
    }[]
}
interface IStandardExercise {
    name: string
    sets: {
        repetitions: number
    }[]
}
interface IWorkoutForm {
    day: Date,
    startTime: string,
    endTime: string,
    izometricExercises: IIzometricExercise[],
    standardExercises: IStandardExercise[] 
}
type WorkoutFormState = IWorkoutForm
