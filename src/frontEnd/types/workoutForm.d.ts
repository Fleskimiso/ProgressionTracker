interface IIzometricExercise {
    name: string
    sets: IIzometricExerciseSet[]
}
interface IStandardExercise {
    name: string
    sets: IStandardExerciseSet[]
}
interface IStandardExerciseSet {
    repetitions: number,
    weight: number,
}
interface IIzometricExerciseSet {
    holdsTime: number[],
    weight: number
}

interface IWorkoutForm {
    day: number,
    startTime: string,
    endTime: string,
    izometricExercises: IIzometricExercise[],
    standardExercises: IStandardExercise[],
    currentStandardExercise: IStandardExercise,
    currentIzometricExercise: IIzometricExercise,
    error: string
}
type WorkoutFormState = IWorkoutForm
