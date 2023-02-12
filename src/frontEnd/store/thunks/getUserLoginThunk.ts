import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {isAxiosError } from "axios";
import { IErrorResponse,ILoginRequest,ILoginResponse } from "../../../common/responseTypes/auth";
import { User } from "../../types/user";
import { RootState } from "../store";

export const getUserLoginThunk = createAsyncThunk<User | void, void, { state: RootState,rejectValue: string }>("getlogin", async (arg, thunkApi) => {
    try{ 
        //try geting the user data
        const response = await axios.get<ILoginResponse>("/api/login")
        if(response.status === 200) {
            return response.data;
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