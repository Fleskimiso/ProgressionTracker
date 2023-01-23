import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, isAxiosError } from "axios";
import { IErrorResponse, ISignUpResponse } from "../../../common/responseTypes/auth";
import { User } from "../../types/user";
import { useAppDispatch } from "../hooks";
import { workoutFormSlice } from "../slices/WorkoutFormSlice";
import { RootState } from "../store";

//might move out the argument type definition
export const signUpUserThunk = createAsyncThunk<User | void, { email: string, password: string, nick: string }, { state: RootState,rejectValue: string }>("signup", async (arg, thunkApi) => {

    try{
        //make a post signup request
        //TODO provide type for request
        const response = await axios.post<ISignUpResponse>("/api/signup", {
            email: arg.email,
            password: arg.password,
            nick: arg.nick
        })
        if(response.status === 200) {
            return response.data
        }
    } catch (e) {
        if( isAxiosError<IErrorResponse>(e)) {
            if(e.response?.data.message) {
                return thunkApi.rejectWithValue(e.response?.data.message)
            }else {
                return thunkApi.rejectWithValue(e.message);
            }
        }else {
        return thunkApi.rejectWithValue("Unexpected error happened during network request");
        }
    }
})