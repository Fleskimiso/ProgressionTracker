import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { IPlan } from "../../../../common/common";
import { IErrorResponse } from "../../../../common/responseTypes/auth";
import { IPutPlanRequest } from "../../../../common/responseTypes/plan";
import { RootState } from "../../store";

export const editPlanThunk = createAsyncThunk<string|void| undefined , IPlan, { state: RootState, rejectValue: string }>("putPlan", async (arg, thunkApi) => {
    try {
        //make put plan request 
        const response = await axios.put<IPutPlanRequest, AxiosResponse<IErrorResponse,IPutPlanRequest> >("/api/login", {
            plan: arg
        });
        if (response.status === 200) {
            let mess = response.data.message ? response.data.message : "ok";
            return mess;
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