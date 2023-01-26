import React from "react"
import { Link } from "react-router-dom"
import { IModifiedWorkout } from "../../common/common"

export const WorkoutCard = (item: IModifiedWorkout) =>{
    return <div>
        <div>
            <div>
            Your workout on: 
            </div>
            <div>
            {new Date(item.day).toLocaleString()}
            </div>
        </div>
        <div >
            <Link to={`/workouts/${item._id}`}>Show Workout Details </Link>
        </div>
    </div>
}