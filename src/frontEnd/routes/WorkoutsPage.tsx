import React, { useEffect } from "react";
import { IModifiedWorkout } from "../../common/common";
import { CardList } from "../components/CardList";
import { WorkoutCard } from "../components/WorkoutCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice";
import { workoutsSlice } from "../store/slices/WorkoutsSlice";
import { getWorkoutsThunk } from "../store/thunks/workout/getWorkoutsThunk";

export const WorkoutsPage = () => {

    const dispatch = useAppDispatch();
    const workoutsState = useAppSelector(state => state.workoutsState);
    const allWorkoutsLen = useAppSelector(state => state.user.wLength);

    const keyExtractor = (workout: IModifiedWorkout) => {
        // most of the time you train once per day
        // high chance that is unique but may change othwerwise
        return workout._id;
    }
    const loadData = async (limit: number, offset: number) => {
        try {
            //load data only when it's not present or there are null values in some places
            //checks for null values
            let j = limit;
            for(let i=offset,z=limit; i<workoutsState.workouts.length && z>0 ; i++, z-- ){
                if (workoutsState.workouts[i] !== null) {
                    j-=1;
                }
            }            
            //if all data is avaible do not make request
            if(j > 0){
                await dispatch(getWorkoutsThunk({limit, offset}));
            }

        } catch (error) {
            let message = "Unknown error"
            if (error instanceof Error) message = error.message
            else message = String(error)
            dispatch(workoutFormSlice.actions.setError(message));
        }


    }


    useEffect(() => {
        if (workoutsState.shouldUpdate) {
            dispatch(getWorkoutsThunk({limit: 10,offset: 0})).then(resp => {
                if (resp.meta.requestStatus === "fulfilled") {
                    //do not make request on another component mount
                    dispatch(workoutsSlice.actions.setShouldUpdate(false));
                } else {
                    if (typeof resp.payload === "string") {
                        dispatch(workoutFormSlice.actions.setError(resp.payload))
                    }
                }
            })
        }
    }, [])

    return <div>
        <div> Title all your workouts i guess </div>
        {workoutsState.workouts && <CardList loadData={loadData} dataLength={allWorkoutsLen === undefined ? 0 : allWorkoutsLen}
            renderItem={WorkoutCard}
            keyExtractor={keyExtractor}
            data={workoutsState.workouts} />}
        <div>{workoutsState.message}</div>
    </div>
}