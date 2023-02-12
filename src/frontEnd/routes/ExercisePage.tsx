import React, { useState } from "react";
import { ExerciseNameInput } from "../components/Forms/inputForms/ExerciseNameInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice";
import { deleteExerciseThunk } from "../store/thunks/workout/deleteExerciseThunk";
import { submitExerciseThunk } from "../store/thunks/workout/submitExerciseThunk";

export const ExercisePage = () => {

    const exerciseList = useAppSelector(state => state.exerciseList);
    const dispatch = useAppDispatch();

    const [exerciseType, setexerciseType] = useState<"izometric" | "standard">("standard");
    const [exerciseName, setExerciseName] = useState("");

    const toggleType = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (exerciseType === "standard") {
            setexerciseType("izometric");
        } else {
            setexerciseType("standard");
        }
    }
    const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setExerciseName(e.target.value);
    }
    //clear the form
    const submitExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(submitExerciseThunk({ name: exerciseName, type: exerciseType })).then(resp => {
            if (resp.meta.requestStatus === "fulfilled") {
                setExerciseName("");
            } else {
                if (typeof resp.payload === "string") {
                    dispatch(workoutFormSlice.actions.setError(resp.payload));
                }
            }
        })
    }
    // log error on rejection
    const deleteExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(deleteExerciseThunk(e.currentTarget.value)).then(resp => {
            if (resp.meta.requestStatus === "rejected") {
                if (typeof resp.payload === "string") {
                    dispatch(workoutFormSlice.actions.setError(resp.payload));
                }
            }
        });
    }

    return <div>
        <div className="mainPlanContainer">
            <div className="singlePlanItem">
                <span>Current Exercise Type: {exerciseType}</span>  <button className="planButton" onClick={toggleType}>Toggle Type</button>
            </div>
            <div className="singlePlanItem">
                <label htmlFor="exerciseName">
                    Exercise Name to add:
                </label>
                <input className="planInput" type="text" id="exerciseName" value={exerciseName} onChange={nameChange} />
            </div>
            <div className="buttonsContainer">
                <button className="planButton" onClick={submitExercise} >Add to list</button>
            </div>
        </div>
        {/* two lists one for one type, second for the other */}
        <div className="exerciseListContainer">
            <div className="typeContainer">
                <div className="typeTitle">
                    Standard
                </div>
                <div className="exercsiesContainer">
                    {
                        exerciseList.map(exercise => {
                            if (exercise.type === "standard") {
                                return <div className="singleExercise" key={exercise.id}>
                                    <span> {exercise.name}</span>
                                    <button value={exercise.id}
                                        onClick={deleteExercise}
                                        className="planButton">X
                                    </button>
                                </div>
                            }
                        })
                    }

                </div>
            </div>
            <div className="typeContainer">
                <div className="typeTitle">
                    Izometric
                </div>
                <div className="exercsiesContainer">
                    {
                        exerciseList.map(exercise => {
                            if (exercise.type === "izometric") {
                                return <div className="singleExercise" key={exercise.id}>
                                    <span> {exercise.name} </span>
                                    <button value={exercise.id}
                                        onClick={deleteExercise}
                                        className="planButton">X
                                    </button>
                                </div>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}