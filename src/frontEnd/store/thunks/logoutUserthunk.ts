import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {isAxiosError } from "axios";
import { IErrorResponse } from "../../../common/responseTypes/auth";
import { RootState } from "../store";

export const logoutUserThunk = createAsyncThunk<void,void, { state: RootState,rejectValue: string }>("logout", async (_arg, thunkApi) => {
    try{ // post login request
        const response = await axios.post("/api/logout"); // no data for logout
        if(response.status === 200) {
            return;
        }
    } catch (e) {
        if( isAxiosError<IErrorResponse>(e)) {
            if(e.response?.data.message) {
                return thunkApi.rejectWithValue(e.response?.data.message);
            }else {
                return thunkApi.rejectWithValue(e.message);
            }
        }else {
        return thunkApi.rejectWithValue("Unexpected error happened during network request");
        }
    }
})