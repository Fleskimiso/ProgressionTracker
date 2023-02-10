import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlan } from "../../../common/common";
import { editPlanThunk } from "../thunks/plan/editPlanThunk";
import { getPlanThunk } from "../thunks/plan/getPlanThunk";

const initialPlanState: { plan: IPlan } = {
    plan: {
        currentDay: 1,
        workouts: []
    }
}

export const planSlice = createSlice({
    initialState: initialPlanState,
    name: "plan",
    reducers: {
        clearPlan: (state,action: PayloadAction<void>) =>{
            state.plan = initialPlanState.plan;
        }
    }, extraReducers(builder) {
        builder.addCase(getPlanThunk.fulfilled, (state, action) => {
            if (action.payload) {
                state.plan = action.payload;
                if (state.plan.workouts.length === 0) {
                    //push dommy workout so that there is no react Error
                    state.plan.workouts.push({
                        day: 1,
                        exercises: [{
                            exercise: "",
                            sets: 0
                        }]
                    })
                }
            }
        })
        builder.addCase(editPlanThunk.fulfilled, (state, action) => {

            state.plan = action.meta.arg; 
        })
    }
})
