import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IModifiedWorkout } from "../../common/common";
import { ExerciseList } from "../components/ExerciseList";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { userSlice } from "../store/slices/UserSlice";
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice";
import { deleteWorkoutThunk } from "../store/thunks/workout/deleteWorkoutThunk";

export const WorkoutDetailsPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const workoutId = useParams().id;
    const [workout, setWorkout] = useState<IModifiedWorkout>({
        _id: "dummyId",
        day: "val",
        duration: "val", izometricExercises: [], standardExercises: []
    });
const workoutState = useAppSelector(state => state.workoutsState)
    const deleteWorkout = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        if(workoutId) {
            dispatch(deleteWorkoutThunk(workoutId)).then(resp =>{
                if(resp.meta.requestStatus === "rejected") {
                    //to do show the message
                    if(resp.payload  && typeof resp.payload === "string") {
                        workoutFormSlice.actions.setError(resp.payload);
                    }
                }else {
                    userSlice.actions.reduceWorkout();
                    navigate("/workouts");
                }
            })
        }
        
    }

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
    <ExerciseList showDeleteButton={false} izometricExercises={workout.izometricExercises} standardExercises={workout.standardExercises} />
    <div className="buttonsContainer">
        <button className="planButton" onClick={deleteWorkout}>DELETE WORKOUT</button>
    </div>
</div>
}