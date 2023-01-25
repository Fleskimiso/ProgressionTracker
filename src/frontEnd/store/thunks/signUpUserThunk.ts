import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {isAxiosError } from "axios";
import { IErrorResponse, ISignupRequest, ISignUpResponse } from "../../../common/responseTypes/auth";
import { User } from "../../types/user";
import { RootState } from "../store";

export const signUpUserThunk=createAsyncThunk<User|void,ISignupRequest,{state:RootState,rejectValue:string}>("signup",async(arg,thunkApi)=>{
    try{
        //make a a sign up request
        const response = await axios.post<ISignUpResponse>("/api/signup", {
            email: arg.email,
            password: arg.password,
            nick: arg.nick
        })
        if(response.status === 200) {
            return response.data
        }
        //handle errors
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