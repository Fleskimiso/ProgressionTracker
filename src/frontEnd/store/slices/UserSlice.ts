import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { loginUserThunk } from "../thunks/logInUserThunk";
import { logoutUserThunk } from "../thunks/logoutUserthunk";
import { signUpUserThunk } from "../thunks/signUpUserThunk";

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
        builder.addCase(signUpUserThunk.fulfilled, (state, action) => {
            if (action.payload) {
                //set the user info
                state._id = action.payload._id;
                state.email = action.payload.email;
                state.nick = action.payload.nick;
            }
        });
        builder.addCase(signUpUserThunk.rejected, (state, action) => {
            //do nothing
            // error meesage could be set on the local user state ...
            // but it's set on workoutForm...
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            if (action.payload) {
                state._id = action.payload._id;
                state.email = action.payload.email;
                state.nick = action.payload.nick;
            }
        });
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            //do nothing 
        });
        builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
            state._id = "";
            state.email = "";
            state.nick = "";
        })
    }
});