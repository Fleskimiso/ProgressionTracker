import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { useAppDispatch } from "../hooks";
import { signUpUserThunk } from "../thunks/signUpUserThunk";
import { workoutFormSlice } from "./WorkoutFormSlice";

const initialState: User = {
    _id: "",
    email: "",
    nick: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
     builder.addCase(signUpUserThunk.fulfilled, (state,action) =>{
        if(action.payload){
            //set the user info
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.nick = action.payload.nick;
        }
     });
     builder.addCase(signUpUserThunk.rejected, (state,action) =>{
        //do nothing
            // error meesage could be set on the local user state ...
            // but it's set on workoutForm...
     })  
    }
});