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
    const sets = useSelector((state: RootState) => { return state.workoutForm.currentIzometricExercise.sets })
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
    const submitSet = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (holdsTime.length > 0) {
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
    const submitExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(workoutFormSlice.actions.submitIzometricExercise());
        setHoldsTime([]);
        setholdTime(0);
        setWeight(0);
    }
    const upHoldTime = (e: React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault();
        e.stopPropagation();
            setholdTime(holdTime+1);
    }
    const downHoldTime =(e: React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault();
        e.stopPropagation();
            if(holdTime > 1) {
                setholdTime(holdTime-1);
            }
    }
    const upWeight = (e: React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault();
        e.stopPropagation();
        setWeight(weight+1);
    }
    const downWeight = (e: React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault();
        e.stopPropagation();
        if(weight > 1){
        setWeight(weight-1)
        }
    }

    return <div className="exerciseInput">
        <ExerciseNameInput exerciseType={props.exerciseType} />
        <div className="inputGroup formSimpleInput">
            <div className="spinInputContainer">
                <label htmlFor="holdTime">Hold time (in seconds): </label>
                <button onClick={upHoldTime} className="spinButton">Up</button>
            </div>
            <div className="spinInputContainer">
                <input value={holdTime} onChange={onHoldTimeChange} type="number" name="holdTime" id="holdTime" />
                <button onClick={downHoldTime} className="spinButton">Down</button>
            </div>
        </div>
        <div className="inputGroup formSimpleInput">
            <div className="spinInputContainer">
                <label htmlFor="weight">Weight (kg): </label>
                <button onClick={upWeight} className="spinButton">Up</button></div>
            <div className="spinInputContainer">
                <input value={weight} onChange={onweightChange} type="number" name="weight" id="weight" />
                <button onClick={downWeight} className="spinButton">Down</button>
            </div>
        </div>
        <div className="buttonContainer">
            <button className="button" type="button" onClick={addHold}>Add hold</button>
        </div>
        <div>
            Set holds: {holdsTime.map((hold) => { return hold + "s, " })}
        </div>
        <div className="buttonsContainer">
            <div className="buttonContainer">
                <button type="button" onClick={submitSet}>
                    Submit set
                </button>
            </div>
            <div className="buttonContainer">
                <button onClick={submitExercise}>
                    Submit exercise
                </button>
            </div>
        </div>
        <div>
            {/* displays current sets */}
            {
                sets.map((set, index) => {
                    return <div key={index}>
                        Set {index + 1}: {set.holdsTime.map(hold => {
                            return hold + "s, ";
                        })}
                        {set.weight === 0 ? "" : `with ${set.weight}kg`}
                    </div>
                })
            }
        </div>

    </div>
}