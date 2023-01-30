import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { IPlan } from "../../../../common/common";
import { IErrorResponse } from "../../../../common/responseTypes/auth";
import { IGetPlanResponse } from "../../../../common/responseTypes/plan";
import { RootState } from "../../store";

export const getPlanThunk = createAsyncThunk<IPlan | void, void, { state: RootState, rejectValue: string }>("getPlan", async (arg, thunkApi) => {
    try {
        //try geting the user data
        const response = await axios.get<IGetPlanResponse>("/api/login")
        if (response.status === 200) {
            return response.data.plan;
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
});

