import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { IErrorResponse } from "../../../../common/responseTypes/auth";
import { IDeleteWorkoutRequest } from "../../../../common/responseTypes/workout";
import { RootState } from "../../store";

export const deleteExerciseThunk = createAsyncThunk<string| undefined, string, { state: RootState, rejectValue: string }>("deleteExercise", async (arg, thunkApi) => {
    try { 
        // delete workout request
        const response = await axios.delete<IErrorResponse>(`\
        /api/exercises/${arg}`);
        if (response.status === 200) {
            return;
        }
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