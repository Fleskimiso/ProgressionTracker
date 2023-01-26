import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { Exercise, IModifiedWorkout } from "../../../../common/common";
import { IErrorResponse } from "../../../../common/responseTypes/auth";
import { IGetExercisesResponse, IWorkoutResponse } from "../../../../common/responseTypes/workout";
import { RootState } from "../../store";

export const getWorkoutsThunk = createAsyncThunk<IModifiedWorkout[], void, { state: RootState, rejectValue: string }>("getWorkouts", async (arg, thunkApi) => {
    try { // post login request
        const response = await axios.get<IWorkoutResponse>("/api/workouts");
        return response.data.workouts;
    } catch (e) {
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