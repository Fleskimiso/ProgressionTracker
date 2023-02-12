import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {isAxiosError } from "axios";
import { IErrorResponse,ILoginRequest,ILoginResponse } from "../../../common/responseTypes/auth";
import { User } from "../../types/user";
import { RootState } from "../store";

export const loginUserThunk = createAsyncThunk<User | void, ILoginRequest, { state: RootState,rejectValue: string }>("login", async (arg, thunkApi) => {
    try{ // post login request
        const response = await axios.post<ILoginResponse>("/api/login", {
            email: arg.email,
            password: arg.password,
        })
        if(response.status === 200) {
            return response.data;
        }
    } catch (e) {
        if( isAxiosError<IErrorResponse>(e)) {
            if(e.response?.status === 401) {
                return thunkApi.rejectWithValue("Incorrect email or password");
            }
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