import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Exercise } from '../../types/exercise';
import { submitExerciseThunk } from '../thunks/workout/submitExerciseThunk';

// dummy state for the begginning
const initialExerciseListState: Exercise[] = [{
        type: "standard",
        name: "pull up"
},
{
    type: "izometric",
    name: "plank"
},{
    type: "standard",
    name: "chin up"
},{
    type: "izometric",
    name: "planch"
},
]

export const exerciseListSlice = createSlice({
    name: "exerciseList",
    initialState: initialExerciseListState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(submitExerciseThunk.fulfilled, (state,action) =>{
            if(action.payload){
                state.push({...action.payload});
            }
        })
        builder.addCase(submitExerciseThunk.rejected, (state,action) =>{
            // 
        })
    },

})