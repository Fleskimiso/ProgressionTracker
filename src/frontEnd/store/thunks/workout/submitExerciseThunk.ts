import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { Exercise } from "../../../../common/common";
import { IErrorResponse } from "../../../../common/responseTypes/auth";
import { ISubmitExerciseNameRequest } from "../../../../common/responseTypes/workout";
import { RootState } from "../../store";

export const submitExerciseThunk = createAsyncThunk<Exercise | void, ISubmitExerciseNameRequest, { state: RootState, rejectValue: string }>("submitExercise", async (arg, thunkApi) => {
    try { // post login request
        const response = await axios.post<Exercise, AxiosResponse<Exercise, ISubmitExerciseNameRequest>, ISubmitExerciseNameRequest>("/api/exercises", {
            name: arg.name,
            type: arg.type
        });
        if (response.status === 200) {
            return {
                name: arg.name,
                type: arg.type,
                id: response.data.id
            }
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