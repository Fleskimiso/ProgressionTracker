import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../store/store";
import { workoutFormSlice } from "../../../store/slices/WorkoutFormSlice"
import { ExerciseNameInput } from "./ExerciseNameInput";

export const StandardExerciseInput = (props: { exerciseType: "standard" }) => {

    const dispatch = useDispatch();
    //repetitions
    const [reps, setReps] = useState(0);
    // additional weight
    const [weight, setWeight] = useState(0);
    //current exercise Sets
    const exerciseSets = useSelector((state: RootState) => {
        return state.workoutForm.currentStandardExercise.sets
    })

    const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReps(Number(e.target.value));
    }
    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(Number(e.target.value));
    }
    const submitSet = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        //submit exercise to the workout form
        if (reps > 0) {
            dispatch(workoutFormSlice.actions.addStandardSet({
                repetitions: reps,
                weight,
            }));
        }
    }
    //submit exercise dispatches submit action
    const submitExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(workoutFormSlice.actions.submitStandardExercise());
    }

    return <div style={{ border: "2px black solid", margin: "2rem" }}>
        <ExerciseNameInput exerciseType={props.exerciseType} />

        <div>
            <label htmlFor="reps">Repetitions number:  </label>
            <input onChange={handleRepsChange} value={reps} type="number" id="reps" name="reps" />
        </div>
        <div>
            <label htmlFor="weight">Additional Weight (kg):  </label>
            <input onChange={handleWeightChange} value={weight} type="number" id="weight" name="weight" />
        </div>
        <div>
            <button type="button" onClick={submitSet} >Add Set</button>
        </div>
        <div>
            {/* display current sets */}
            {
                // to do removing on the click 
                exerciseSets.map((set, index) => {
                    return <div  key={index}>
                        Set {index + 1}: {set.repetitions} Repetitions 
                        {set.weight === 0 ? "" : ` with ${set.weight} kg`}
                    </div>
                })
            }
        </div>
        <button type="button" onClick={submitExercise}>
            Submit exercise
        </button>

    </div>
}