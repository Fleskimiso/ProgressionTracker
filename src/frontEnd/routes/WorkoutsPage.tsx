import React, {useEffect} from "react";
import { IModifiedWorkout } from "../../common/common";
import { CardList } from "../components/CardList";
import { WorkoutCard } from "../components/WorkoutCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice";
import { workoutsSlice } from "../store/slices/WorkoutsSlice";
import { getWorkoutsThunk } from "../store/thunks/workout/getWorkoutsThunk";

export const WorkoutsPage = () =>{

    const dispatch = useAppDispatch();
    const workoutsState = useAppSelector(state => state.workoutsState);

    const keyExtractor= (workout: IModifiedWorkout) =>{
        // most of the time you train once per day
        // high chance that is unique but may change othwerwise
        return workout.day.toString()+workout.duration.toString();
    }

    useEffect(() =>{
        if(workoutsState.shouldUpdate) {
            dispatch(getWorkoutsThunk()).then(resp =>{
                if(resp.meta.requestStatus === "fulfilled"){
                    //do not make request on another component mount
                    dispatch(workoutsSlice.actions.setShouldUpdate(false));
                }else {
                    if( typeof resp.payload === "string"){
                        dispatch(workoutFormSlice.actions.setError(resp.payload))
                    }
                }
            })
        }
    },[])

    return <div>
        <div> Title all your workouts i guess </div>
            { workoutsState.workouts && <CardList renderItem={WorkoutCard} keyExtractor={keyExtractor} data={workoutsState.workouts}  /> }
        <div>{workoutsState.message}</div>    
        </div>
}