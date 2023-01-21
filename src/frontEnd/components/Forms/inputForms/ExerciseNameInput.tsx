import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../store/store";
import { exerciseListSlice } from "../../../store/slices/ExerciseListSlice"
import { workoutFormSlice } from "../../../store/slices/WorkoutFormSlice";

//exercise type might be enum TODO!
export const ExerciseNameInput = (props: { exerciseType: "standard" | "izometric" }) => {

    const dispatch = useDispatch();
    //list of availble exercises
    const exerciseList = useSelector((state: RootState) => { return state.exerciseList });

    const [newExerciseName, setnewExerciseName] = useState("");
    // handle newexerciseName submit
    const handleNewExerciseNameSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (newExerciseName !== "") {
            dispatch(exerciseListSlice.actions.addExercise({ name: newExerciseName, type: props.exerciseType }))
            setnewExerciseName("");
        }
    }
    //name self explaning
    const currentStandardExerciseName = useSelector((state: RootState) => {
         return state.workoutForm.currentStandardExercise.name });
    //same for this
    const currentIzometricExerciseName = useSelector((state: RootState) => {
        return state.workoutForm.currentIzometricExercise.name });

    //handle exercise name selection push to current exercise
    const handleNameSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(workoutFormSlice.actions.changeCurrentExerciseName({
            exerciseType: props.exerciseType,
            name: e.target.value
        }))
    }

    return <div>
        <div>
            <label htmlFor="exerciseName">Exercise Name: </label>
            <select value={props.exerciseType === "standard" ? currentStandardExerciseName : currentIzometricExerciseName } 
            onChange={handleNameSelect} name="exerciseName" id="exerciseName">
                {exerciseList.map((exercise) => {
                    if (exercise.type === props.exerciseType) {
                        //name of the exercise is supossed to be unique
                        return <option key={exercise.name} value={exercise.name}>
                            {exercise.name}
                        </option>
                    }
                })}
            </select>
        </div>
        <div>
            <label htmlFor="newExerciseName">Add exercise name to the list: </label>
            {/* handle change inline... */}
            <input type="text" value={newExerciseName} id="newExerciseName"
                onChange={(e) => { setnewExerciseName(e.target.value) }} />
            <button type="button" onClick={handleNewExerciseNameSubmit} >Define!</button>
        </div>
    </div>
}