import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIzometricExerciseSet, IStandardExerciseSet, WorkoutFormState } from '../../types/workoutForm';
import { submitWorkoutThunk } from '../thunks/workout/submitWorkoutThunk';


const clearWorkout = (state: WorkoutFormState) =>{
    state.endTime = "";
            state.startTime = "";
            state.standardExercises = [];
            state.izometricExercises = [];
            state.currentStandardExercise = {
                name: "",
                sets: []
            };
            state.currentIzometricExercise = {
                name: "",
                sets: []
            };
            state.error = "";
            state.message = "";
            state.day = Date.now();  
}

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
        clearMessage: (state, action: PayloadAction<void>)=>{
            state.message = "";
        },
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
            state.standardExercises.push({ sets: state.currentStandardExercise.sets,
            exercise: {
                name: state.currentStandardExercise.name,
                type: "standard"
            } });
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
            state.izometricExercises.push({ sets: state.currentIzometricExercise.sets, 
            exercise: {
                name: state.currentIzometricExercise.name,
                type: "izometric"
            } });
            state.currentIzometricExercise.name = "";
            state.currentIzometricExercise.sets = [];
        },
        setCacheWorkout: (state, action: PayloadAction<WorkoutFormState>) =>{
            state.endTime = action.payload.endTime;
            state.startTime = action.payload.startTime;
            state.standardExercises = action.payload.standardExercises;
            state.izometricExercises = action.payload.izometricExercises;
            state.currentStandardExercise = action.payload.currentStandardExercise;
            state.currentIzometricExercise = action.payload.currentIzometricExercise;
            state.error = action.payload.error;
            state.message = action.payload.message;
            state.day = action.payload.day;
        },
        clearWorkoutForm: (state,action: PayloadAction<void>) =>{
                clearWorkout(state);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(submitWorkoutThunk.fulfilled, (state, action) => {
            if(typeof action.payload === "number"){
                if(action.payload === 200)  {
                   clearWorkout(state);
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

