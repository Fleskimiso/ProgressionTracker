import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const asyncsubmitWorkout = createAsyncThunk("submitWorkout", async (arg, thunkApi) =>{
    console.log("make async request");
    return "something"
})

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
        error: ""
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
        },
        addStandardSet: (state,action: PayloadAction<IStandardExerciseSet>) =>{
            //add exercise set to the list 
            state.currentStandardExercise.sets.push({
                repetitions: action.payload.repetitions,
                weight: action.payload.weight
            })
        },
        addIzometricSet: (state,action: PayloadAction<IIzometricExerciseSet>) =>{
            //add exercise set to the list 
            state.currentIzometricExercise.sets.push({
                holdsTime: [...action.payload.holdsTime],
                weight: action.payload.weight
            })
        },
        //inline payloadaction type
        changeCurrentExerciseName: (state,action: PayloadAction<{
            exerciseType: "standard" | "izometric",
            name: string
        }>) =>{
            if(action.payload.exerciseType === "standard"){
                state.currentStandardExercise.name = action.payload.name;
            }else {
                state.currentIzometricExercise.name = action.payload.name;
            }
        },
        //no payload for this action
        submitStandardExercise: (state,action: PayloadAction<void> ) =>{
            if( state.currentStandardExercise.sets.length === 0){
                state.error = "There should be at least one set for an exercise";
                return;
            }
            if(state.currentStandardExercise.name === ""){
                state.error = "Choose a name for an exercise";
                return;
            }
            //push the copy 
            state.standardExercises.push({...state.currentStandardExercise});
            state.currentStandardExercise.name = "";
            state.currentStandardExercise.sets = [];
        },
        submitIzometricExercise: (state,action: PayloadAction<void> ) =>{ 
            if( state.currentIzometricExercise.sets.length === 0){
                state.error = "There should be at least one set for an exercise";
                return;
            }
            if(state.currentIzometricExercise.name === ""){
                state.error = "Choose a name for an exercise";
                return;
            }
            //push the copy 
            state.izometricExercises.push({...state.currentIzometricExercise});
            state.currentIzometricExercise.name = "";
            state.currentIzometricExercise.sets = [];
        },
       
    },
    extraReducers:   (builder) =>{
        builder.addCase(asyncsubmitWorkout.fulfilled, (state,action) =>{
            console.log("should be fulfilled");
        })
    },
})

