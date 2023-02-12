import React from "react"
import { IModifiedIzometricExercise, IModifiedStandardExercise } from "../../common/common"
import { useAppDispatch } from "../store/hooks"
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice"
//TODO STYLING
type exerciseListType = {
    izometricExercises: IModifiedIzometricExercise[],
    standardExercises: IModifiedStandardExercise[]
}

export const ExerciseList = ({ izometricExercises, standardExercises }: exerciseListType) => {


    const dispatch = useAppDispatch();
    const deleteExercise = (e: React.MouseEvent<HTMLButtonElement>) =>{
        
        e.preventDefault();
        const value = e.currentTarget.value;
        const splitedValue = value.split(":");
        const type = splitedValue[0]
        const index = parseInt(splitedValue[1]);
        console.log(type,index);
        
        if(type === "izometric"){
            console.log("dfsdlfkj");
            
            dispatch(workoutFormSlice.actions.deleteIzometricExercise(index));
        }else {
            dispatch(workoutFormSlice.actions.deleteStandardExercise(index));
        }
    }

    return <div className="exerciseListContainer">
        <div className="typeContainer">
            {/* for izometric Exercises */}
            <div className="typeTitle"> Izometric Exercises
                {izometricExercises.length === 0 ? "(none)" : ""}
            </div>
            <div className="exercisesContainer">
                {/* map over each exercise */}
                {izometricExercises.map((exercise, index) => {
                    return <div className="exerciseContainer" key={index}>
                        {/* commment from the future there should be different naming convention */}
                        <div className="exerciseName"> {exercise.exerciseName} <button
                        onClick={deleteExercise}
                        value={`izometric:${index}`}
                        className="planButton">X</button> </div>
                        <div className="setsContainer">
                            {/* display exercise name map over each exercise set */}
                        {exercise.sets.map((set, setIndex) => {
                            return <div className="setContainer" key={setIndex}>
                                {/* show set data  */}
                                <div className="setLabelContainer">Set {setIndex + 1}:&nbsp; </div> <div className="repsContainer">
                                    {
                                        set.holdsTime.map((hold) => {
                                            return hold + "s, "
                                        })}
                                    { // callback hell :(
                                        set.weight === 0 ? "" : `with ${set.weight}kg`
                                    }
                                </div>
                            </div>
                        })}
                        </div>
                    </div>
                })}
            </div>
        </div>
        <div className="typeContainer">
            {/* for standard Exercicses */}
            <div className="typeTitle"> Standard Exercises
                {standardExercises.length === 0 ? "(none)" : ""}
            </div>
            <div className="exercisesContainer">
                {
                    standardExercises.map((exercise, index) => {
                        return <div className="exerciseContainer" key={index}>
                            <div className="exerciseName"> {exercise.exerciseName} <button 
                            onClick={deleteExercise}
                            value={`standard:${index}`}
                            className="planButton">X</button></div>
                            <div className="setsContainer">
                            {
                                exercise.sets.map((set, setIndex) => {
                                    return <div className="setContainer" key={setIndex}>
                                        <div className="setLabelContainer">Set {setIndex + 1}:&nbsp; </div>
                                        <div className="repsContainer">{set.repetitions} Repetitions 
                                            {set.weight === 0 ? "" : ` with ${set.weight}kg`}</div>
                                    </div>
                                })
                            }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}