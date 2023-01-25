import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { submitExerciseThunk } from '../thunks/workout/submitExerciseThunk';
import { getExercisesThunk } from '../thunks/workout/getExercisesThunk';
import { Exercise } from '../../../common/common';

// dummy state for the begginning
const initialExerciseListState: Exercise[] = [
]

export const exerciseListSlice = createSlice({
    name: "exerciseList",
    initialState: initialExerciseListState,
    reducers: {
        clear: (state,action: PayloadAction<void>)=>{
            state.length = 0;
        }
    },
    extraReducers(builder) {
        builder.addCase(submitExerciseThunk.fulfilled, (state,action) =>{
            if(action.payload){
                console.log(action.payload);
                
                state.push({...action.payload});
            }
        })
        builder.addCase(submitExerciseThunk.rejected, (state,action) =>{
            // 
        })
        builder.addCase(getExercisesThunk.fulfilled, (state,action) =>{
            if(action.payload) {
                //clear the array because redux needs to know original reference
                state.length = 0;
                state.push(...action.payload);
            }
        })
    },

})