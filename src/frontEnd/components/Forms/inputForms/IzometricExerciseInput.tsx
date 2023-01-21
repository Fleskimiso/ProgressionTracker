import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../store/store";
import { exerciseListSlice } from "../../../store/slices/ExerciseListSlice"
import { ExerciseNameInput } from "./ExerciseNameInput";
import { workoutFormSlice } from "../../../store/slices/WorkoutFormSlice";

//TODO set deletions 
export const IzometricExerciseInput = (props: { exerciseType: "izometric" }) => {

    const dispatch = useDispatch();
    //izometric exercises sets
    const sets = useSelector((state: RootState) =>{ return state.workoutForm.currentIzometricExercise.sets})
    // just a hold in seconds
    const [holdTime, setholdTime] = useState(0);
    // array of holds
    const [holdsTime, setHoldsTime] = useState<number[]>([]);
    // handle hold time change
    const [weight, setWeight] = useState(0);
    const onHoldTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setholdTime(Number(e.target.value));
    }
    const onweightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(Number(e.target.value));
    }
    /**
     * add hold to the array
     */
    const addHold = () => {
        if (holdTime > 0) {
            setHoldsTime([...holdsTime, holdTime]);
        }
    }
    /**
     * dispatches a submitIzometricSet action
     */
    const submitSet = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        e.stopPropagation();
        if(holdsTime.length > 0){
            dispatch(workoutFormSlice.actions.addIzometricSet({
                holdsTime,
                weight
            }))
            setHoldsTime([]);
        }
    }
    /**
     * dispatches `addIzometricExercise` action
     */
    const submitExercise = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        e.stopPropagation();
        dispatch(workoutFormSlice.actions.submitIzometricExercise());
        setHoldsTime([]);
        setholdTime(0);
        setWeight(0);
    }

    return <div style={{ border: "2px black solid", margin: "2rem" }}>
        <ExerciseNameInput exerciseType={props.exerciseType} />
        <div>
            <label htmlFor="holdTime">Hold time (in seconds): </label>
            <input value={holdTime} onChange={onHoldTimeChange} type="number" name="holdTime" id="holdTime" />
            <button type="button" onClick={addHold}>Add hold</button>
        </div>
        <div>
            <label htmlFor="weight">Weight (kg): </label>
            <input value={weight} onChange={onweightChange} type="number" name="weight" id="weight" />
        </div>
        <div>
            Holds: {holdsTime.map((hold) => {return hold+"s, " })}
        </div>
        <button type="button" onClick={submitSet}>Submit set</button>
        <div>
            {/* displays current sets */}
            {
                sets.map( (set,index) =>{
                    return <div key={index}>
                        Set {index+1}: {set.holdsTime.map(hold =>{
                            return hold+"s, ";
                        })} 
                        {set.weight === 0? "" : `with ${set.weight}kg`} 
                    </div>
                })
            }
        </div>
        <button onClick={submitExercise}>
            Submit exercise
        </button>
    </div>
}