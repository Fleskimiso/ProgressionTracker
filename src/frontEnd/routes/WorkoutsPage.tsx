import React, {useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice";
import { workoutsSlice } from "../store/slices/WorkoutsSlice";
import { getWorkoutsThunk } from "../store/thunks/workout/getWorkoutsThunk";

export const WorkoutPage = () =>{

    const dispatch = useAppDispatch();
    const workoutsState = useAppSelector(state => state.workoutsState);

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
        
    </div>
}