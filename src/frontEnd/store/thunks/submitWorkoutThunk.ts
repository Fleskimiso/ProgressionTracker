import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {IWorkoutRequest} from "../../../common/responseTypes/workout"
import { RootState } from "../store";

export const submitWorkoutThunk = createAsyncThunk<number | void, void, { state: RootState }>("submitWorkout", (arg, { getState }) => {
    const state = getState();
    //calculate the duration
    const startTime = Number(state.workoutForm.startTime.split(":")[0]) * 60 + Number(state.workoutForm.startTime.split(":")[1]);
    const endTime = Number(state.workoutForm.endTime.split(":")[0]) * 60 + Number(state.workoutForm.endTime.split(":")[1]);
    const difference = endTime - startTime;
    const duration = difference / 60 + ":" + (difference % 60 < 10 ? "0" + difference % 60 : difference % 60)
    /**
     * check if array is empty if yes then reject 
     */
    if (state.workoutForm.izometricExercises.length === 0
        && state.workoutForm.standardExercises.length === 0) {
        // workoutFormSlice.actions.setError("There should be at least one exercise in workout");
        throw new Error("There should be at least one exercise in workout");
    }
       return axios.post<IWorkoutRequest>("/api/workouts", {
            duration,
            day: state.workoutForm.day,
            izometricExercises: [...state.workoutForm.izometricExercises],
            standardExercises: [...state.workoutForm.standardExercises]
        }).then(response =>{
            if(response.status === 200){
                return response.status;
            } else {
                throw new Error("The response status is wrong");
            }
        }).catch((e: Error) =>{
            throw new Error(e.message);
        });
       

})