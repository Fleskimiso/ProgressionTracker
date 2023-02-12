import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { Exercise } from "../../../../common/common";
import { IErrorResponse } from "../../../../common/responseTypes/auth";
import { IGetExercisesResponse } from "../../../../common/responseTypes/workout";
import { RootState } from "../../store";

export const getExercisesThunk = createAsyncThunk<Exercise[] | void, void, { state: RootState, rejectValue: string }>("getExercises", async (arg, thunkApi) => {
    try { // post login request
        const response = await axios.get<IGetExercisesResponse>("/api/exercises");
        if (response.status === 200) {
            return [
                ...response.data.exercises
            ]
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