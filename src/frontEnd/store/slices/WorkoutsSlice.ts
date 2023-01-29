import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModifiedWorkout} from "../../../common/common"
import { getWorkoutsThunk } from "../thunks/workout/getWorkoutsThunk";
import immutable from "immutable"

//add caching maybe watch when the workouts are added ...
const initialState : { workouts: (IModifiedWorkout|null)[], shouldUpdate: boolean, message: string }= {
    workouts:  [],
    shouldUpdate: true,
    message: ""
}

export const workoutsSlice = createSlice({
    name: "workouts",
    initialState,
    reducers: {
        setShouldUpdate: (state,action: PayloadAction<boolean>) =>{
            state.shouldUpdate = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getWorkoutsThunk.fulfilled, (state,action) =>{
            if(action.payload.limit + action.payload.offset  > state.workouts.length) {
                state.workouts.fill(null,action.payload.offset,action.payload.limit);
            }
            for(let i=0; i<action.payload.limit; i++) {
                state.workouts[i+action.payload.offset] = action.payload.workouts[i];
            }
            state.shouldUpdate = false;
            state.message = "";
        });
        builder.addCase(getWorkoutsThunk.pending, (state,action) =>{
            state.message = "Loading workouts..."
        })
    },
})