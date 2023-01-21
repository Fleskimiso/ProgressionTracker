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
//change