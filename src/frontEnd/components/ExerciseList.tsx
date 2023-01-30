import React from "react"
import { IModifiedIzometricExercise, IModifiedStandardExercise } from "../../common/common"

//TODO STYLING
type exerciseListType = {
    izometricExercises: IModifiedIzometricExercise[],
    standardExercises: IModifiedStandardExercise[]
}

export const ExerciseList = ({izometricExercises, standardExercises}: exerciseListType ) => {

    return <div>
        <div>
            {/* for izometric Exercises */}
            <div> Izometric Exercises
                {izometricExercises.length === 0 ? "(none)" : ""}
            </div>
            {/* map over each exercise */}
            {izometricExercises.map((exercise, index) => {
                return <div key={index}>
                    {/* commment from the future there should be different naming convention */}
                    <div> {exercise.exercise.name} </div>
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
                {standardExercises.length === 0 ? "(none)" : ""}
            </div>
            {
                standardExercises.map((exercise, index) => {
                    return <div key={index}>
                        <div> {exercise.exercise.name} </div>
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