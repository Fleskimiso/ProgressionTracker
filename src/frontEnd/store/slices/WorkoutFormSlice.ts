import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialWorkoutFormState: WorkoutFormState = {
         day: Date.now(), 
        startTime: "15:00",
        endTime: "16:00",
        standardExercises: [],
        izometricExercises: []
}

export const workoutFormSlice = createSlice({
    name: "workoutForm",
    initialState: initialWorkoutFormState,
    reducers: {
        changeStartTime: (state,action: PayloadAction<string>) =>{
            state.startTime = action.payload;
        },
        changeEndTime: (state,action: PayloadAction<string>) =>{
            state.endTime = action.payload;
        },
        changeDay: (state,action: PayloadAction<number>) =>{
            state.day = action.payload;
        }
    }
})

