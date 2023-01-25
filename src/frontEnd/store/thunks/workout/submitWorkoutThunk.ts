import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { IErrorResponse } from "../../../../common/responseTypes/auth";
import {IWorkoutRequest} from "../../../../common/responseTypes/workout"
import { RootState } from "../../store";

export const submitWorkoutThunk = createAsyncThunk<void, void, { state: RootState, rejectWithValue: String }>("submitWorkout",async (arg, thunkApi) => {
    const state = thunkApi.getState();
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
        throw new Error("There should be at least one exercise in workout");
    }
    try {
       const response = await axios.post<IWorkoutRequest,AxiosResponse<IErrorResponse, IWorkoutRequest>, IWorkoutRequest>("/api/workouts", {
            day: state.workoutForm.day,
            izometricExercises: [...state.workoutForm.izometricExercises],
            standardExercises: [...state.workoutForm.standardExercises],
            duration,
        }, {withCredentials: true});
        if(response.status === 200) {
            console.log(response.data.message);
            return;
        }
        throw new Error("Unexpected error");
    }
    catch (e)
        {
            if (isAxiosError<IErrorResponse>(e)) {
                if (e.response?.data.message) {
                    return thunkApi.rejectWithValue(e.response?.data.message);
                } else {
                    return thunkApi.rejectWithValue(e.message);
                }
            } else {
                return thunkApi.rejectWithValue("Unexpected error happened during network request");
            }
        }
       

})