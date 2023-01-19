import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Exercise } from '../../types/exercise';

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
        // only adding exercise for now also should do post request here to the database
        addExercise: (state,action: PayloadAction<Exercise>) =>{
            state.push(action.payload);
        },
    }
})