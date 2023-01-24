import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIzometricExerciseSet, IStandardExerciseSet, WorkoutFormState } from '../../types/workoutForm';
import { submitWorkoutThunk } from '../thunks/workout/submitWorkoutThunk';



const initialWorkoutFormState: WorkoutFormState = {
    day: Date.now(),
    startTime: "15:00",
    endTime: "16:00",
    standardExercises: [],
    izometricExercises: [],
    currentStandardExercise: {
        name: "", //default name will be first exercise name from the list (if exists)
        sets: []
    },
    currentIzometricExercise: {
        name: "", //same as a above
        sets: []
    },
    error: "",
    message: ""
}

export const workoutFormSlice = createSlice({
    name: "workoutForm",
    initialState: initialWorkoutFormState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        changeStartTime: (state, action: PayloadAction<string>) => {
            state.startTime = action.payload;
        },
        changeEndTime: (state, action: PayloadAction<string>) => {
            state.endTime = action.payload;
        },
        changeDay: (state, action: PayloadAction<number>) => {
            state.day = action.payload;
        },
        addStandardSet: (state, action: PayloadAction<IStandardExerciseSet>) => {
            //add exercise set to the list 
            state.currentStandardExercise.sets.push({
                repetitions: action.payload.repetitions,
                weight: action.payload.weight
            })
        },
        addIzometricSet: (state, action: PayloadAction<IIzometricExerciseSet>) => {
            //add exercise set to the list 
            state.currentIzometricExercise.sets.push({
                holdsTime: [...action.payload.holdsTime],
                weight: action.payload.weight
            })
        },
        //inline payloadaction type
        changeCurrentExerciseName: (state, action: PayloadAction<{
            exerciseType: "standard" | "izometric",
            name: string
        }>) => {
            if (action.payload.exerciseType === "standard") {
                state.currentStandardExercise.name = action.payload.name;
            } else {
                state.currentIzometricExercise.name = action.payload.name;
            }
        },
        //no payload for this action
        submitStandardExercise: (state, action: PayloadAction<void>) => {
            if (state.currentStandardExercise.sets.length === 0) {
                state.error = "There should be at least one set for an exercise";
                return;
            }
            if (state.currentStandardExercise.name === "") {
                state.error = "Choose a name for an exercise";
                return;
            }
            //push the copy 
            state.standardExercises.push({ ...state.currentStandardExercise });
            state.currentStandardExercise.name = "";
            state.currentStandardExercise.sets = [];
        },
        submitIzometricExercise: (state, action: PayloadAction<void>) => {
            if (state.currentIzometricExercise.sets.length === 0) {
                state.error = "There should be at least one set for an exercise";
                return;
            }
            if (state.currentIzometricExercise.name === "") {
                state.error = "Choose a name for an exercise";
                return;
            }
            //push the copy 
            state.izometricExercises.push({ ...state.currentIzometricExercise });
            state.currentIzometricExercise.name = "";
            state.currentIzometricExercise.sets = [];
        },

    },
    extraReducers: (builder) => {
        builder.addCase(submitWorkoutThunk.fulfilled, (state, action) => {
            if(typeof action.payload === "number"){
                if(action.payload === 200)  {
                    //delete the whole current workout TODO
                    console.log("I should delete...");
                    
                }
            }
            state.message = ""
        });
        builder.addCase(submitWorkoutThunk.rejected, (state,action) =>{
           //handle rejection that is display the error message
            if( typeof action.error.message === "string"){
                state.error = action.error.message;
            }
            state.message = "";
        });
        builder.addCase(submitWorkoutThunk.pending, (state,action) =>{
            state.message = "submiting..."
        })
    },
})

