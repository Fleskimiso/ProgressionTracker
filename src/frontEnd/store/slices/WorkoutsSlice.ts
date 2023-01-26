import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModifiedWorkout} from "../../../common/common"
import { getWorkoutsThunk } from "../thunks/workout/getWorkoutsThunk";

//add caching maybe watch when the workouts are added ...
const initialState : { workouts: IModifiedWorkout[], shouldUpdate: boolean }= {
    workouts: [],
    shouldUpdate: true
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
            state.workouts = action.payload;
            state.shouldUpdate = false;
        });
    },
})