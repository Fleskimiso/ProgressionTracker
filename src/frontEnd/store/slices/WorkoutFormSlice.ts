import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import axios, { AxiosError } from 'axios';

//make a testful request
//TODO move this thunk to other file
export const asyncsubmitWorkout = createAsyncThunk<void, void, { state: RootState }>("submitWorkout", async (arg, { getState }) => {
    const state = getState();
    //calculate the duration
    const startTime = Number(state.workoutForm.startTime.split(":")[0]) * 60 + Number(state.workoutForm.startTime.split(":")[1]);
    const endTime = Number(state.workoutForm.endTime.split(":")[0]) * 60 + Number(state.workoutForm.endTime.split(":")[1]);
    const difference = endTime - startTime;
    const duration = difference / 60 + ":" + (difference % 60 < 10 ? "0" + difference % 60 : difference % 60)
    /**
     * check if array is empty if yes then reject 
     */
    if (state.workoutForm.izometricExercises.length === 0
        && state.workoutForm.standardExercises.length === 0) {
        // workoutFormSlice.actions.setError("There should be at least one exercise in workout");
        throw new Error("There should be at least one exercise in workout");
    }
    //make a a post request
    try {
        const resp = await axios.post("/api/workouts", {
            duration,
            day: state.workoutForm.day,
            izometricExercises: [...state.workoutForm.izometricExercises],
            standardExercises: [...state.workoutForm.standardExercises]
        });
        if (resp.status === 200) {
            //TODO clean the entire workoutForm
            console.log("can clean the current state")
        }
        //TODO better error handling
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("axios error");
        }
        console.log(error);
    }

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
        builder.addCase(asyncsubmitWorkout.fulfilled, (state, action) => {
            console.log("should be fulfilled");
        })
        builder.addCase(asyncsubmitWorkout.rejected, (state,action) =>{
            if( typeof action.error.message === "string"){
                state.error = action.error.message;
            }
        })
    },
})

