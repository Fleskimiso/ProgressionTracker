import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlan } from "../../../common/common";
import { editPlanThunk } from "../thunks/plan/editPlanThunk";
import { getPlanThunk } from "../thunks/plan/getPlanThunk";

const initialPlanState: {plan: IPlan} = {
    plan: {
        currentDay: 1,
        workouts: []
    }
}

export const planSlice = createSlice({
    initialState: initialPlanState,
    name: "plan",
    reducers: {

    }, extraReducers(builder) {
        builder.addCase(getPlanThunk.fulfilled, (state,action) =>{
            if(action.payload) {
                state.plan = action.payload;
            }
        })
        builder.addCase(editPlanThunk.fulfilled, (state,action) =>{
            state.plan = action.meta.arg;
        })
    }
})
