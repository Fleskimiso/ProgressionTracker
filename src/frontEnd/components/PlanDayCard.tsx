import React from "react"

type workoutDayType = {
    day: number,
    exercises: {
        exercise: string,
        sets: number
    }[]
}

export const PlanDayCard = ({ workoutDay }: { workoutDay: workoutDayType }) => {

    return <div>
        Day: {workoutDay.day}
        <div>
            {workoutDay.exercises.map(exercise => {
                return <div key={exercise.exercise}>
                    <div>Exercise name: {exercise.exercise}</div>
                    <div>Sets: {exercise.sets}</div>
                </div>
            })}
        </div>
    </div>
}