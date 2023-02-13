import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { Exercise, IModifiedWorkout } from "../../../../common/common";
import { IErrorResponse } from "../../../../common/responseTypes/auth";
import { IGetExercisesResponse, IWorkoutResponse } from "../../../../common/responseTypes/workout";
import { RootState } from "../../store";

type resp = {
    workouts: IModifiedWorkout[],
    limit: number,
    offset: number
}
type args = { limit: number, offset: number }

export const getWorkoutsThunk = createAsyncThunk<resp,args, { state: RootState, rejectValue: string }>("getWorkouts",
    async (arg = { limit: 10, offset: 0 }, thunkApi) => {
        try { // post login request
            const response = await axios.get<IWorkoutResponse>(`/api/workouts?limit${arg.limit}&offset=${arg.offset}`  );
            return {
                workouts: response.data.workouts,
                limit: arg.limit,
                offset: arg.offset
            };
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