import React from "react"

type workoutDayType = {
    day: number,
    exercises: {
        exercise: string,
        sets: number
    }[]
}

export const PlanDayCard = ({ workoutDay }: { workoutDay: workoutDayType }) => {

    return <div className="planCard">
        Day: {workoutDay.day}
        <div>
            {workoutDay.exercises.map((exercise,index) => {
                return <div key={exercise.exercise + index}>
                   {`${index+1}.`} {exercise.exercise} x{exercise.sets}
                </div>
            })}
        </div>
    </div>
}