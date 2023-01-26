import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModifiedWorkout} from "../../../common/common"
import { getWorkoutsThunk } from "../thunks/workout/getWorkoutsThunk";

//add caching maybe watch when the workouts are added ...
const initialState : { workouts: IModifiedWorkout[], shouldUpdate: boolean, message: string }= {
    workouts: [],
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
           // console.log(action.payload);
            state.workouts.length = 0;
            state.workouts.push(...action.payload);
            state.shouldUpdate = false;
            state.message = "";
        });
        builder.addCase(getWorkoutsThunk.pending, (state,action) =>{
            state.message = "Loading workouts..."
        })
    },
})