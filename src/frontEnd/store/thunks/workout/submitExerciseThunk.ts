import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { IErrorResponse } from "../../../../common/responseTypes/auth";
import { ISubmitExerciseNameRequest } from "../../../../common/responseTypes/workout";
import { Exercise } from "../../../types/exercise";
import { RootState } from "../../store";

export const submitExerciseThunk = createAsyncThunk<Exercise | void, ISubmitExerciseNameRequest, { state: RootState, rejectValue: string }>("submitExercise", async (arg, thunkApi) => {
    try { // post login request
        const response = await axios.post("/api/workouts/exercise", {
            name: arg.name,
            type: arg.type
        });
        if (response.status === 200) {
            return {
                name: arg.name,
                type: arg.type
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