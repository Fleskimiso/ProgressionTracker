import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IModifiedWorkout } from "../../common/common";
import { ExerciseList } from "../components/ExerciseList";
import { useAppSelector } from "../store/hooks";

export const WorkoutDetailsPage = () => {

    const workoutId = useParams().id;
    const [workout, setWorkout] = useState<IModifiedWorkout>({
        _id: "dummyId",
        day: "val",
        duration: "val", izometricExercises: [], standardExercises: []
    });
const workoutState = useAppSelector(state => state.workoutsState)


useEffect(() => {
    if (workoutId) {
        //find the workout
        const workout = workoutState.workouts.find(w => {
            if (w && w._id === workoutId) {
                return w;
            }
        });
        if (workout) {
            setWorkout(workout);
        }
    }
}, [])

return <div className="mainContainer">
    <div className="singleContentItem">
        Your workout on: {new Date(workout.day).toLocaleDateString()}
    </div>
    <div className="singleContentItem">
        Was {workout?.duration} hours long...
    </div>
    <ExerciseList izometricExercises={workout.izometricExercises} standardExercises={workout.standardExercises} />
</div>
}