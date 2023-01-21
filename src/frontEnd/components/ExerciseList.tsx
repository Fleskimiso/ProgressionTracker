import React from "react"
import { Root } from "react-dom/client"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

//TODO STYLING
export const ExerciseList = () => {

    const workoutForm = useSelector((state: RootState) => { return state.workoutForm });

    return <div>
        <div>
            {/* for izometric Exercises */}
            <div> Izometric Exercises
                {workoutForm.izometricExercises.length === 0 ? "(none yet)" : ""}
            </div>
            {/* map over each exercise */}
            {workoutForm.izometricExercises.map((exercise, index) => {
                return <div key={index}>
                    <div> {exercise.name} </div>
                    {/* display exercise name map over each exercise set */}
                    {exercise.sets.map((set, setIndex) => {
                        return <div key={setIndex}>
                            {/* show set data  */}
                            Set {setIndex + 1}: {
                                set.holdsTime.map((hold) => {
                                    return hold + "s, "
                                })}
                            { // callback hell :(
                                set.weight === 0 ? "" : `with ${set.weight}kg`
                            }
                        </div>
                    })}
                </div>
            })}
        </div>
        <div>
            {/* for standard Exercicses */}
            <div> Standard Exercises
                {workoutForm.standardExercises.length === 0 ? "(none yet)" : ""}
            </div>
            {
                workoutForm.standardExercises.map((exercise, index) => {
                    return <div key={index}>
                        <div> {exercise.name} </div>
                        {
                            exercise.sets.map((set, setIndex) => {
                                return <div key={setIndex}>
                                    Set {setIndex + 1}: {set.repetitions} Repetitions
                                    {set.weight === 0 ? "" : `with ${set.weight}kg`}
                                </div>
                            })
                        }
                    </div>
                })
            }
        </div>
    </div>
}