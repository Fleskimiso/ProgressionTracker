import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialWorkoutFormState: WorkoutFormState = {
        day: new Date,
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
        }
    }
})

