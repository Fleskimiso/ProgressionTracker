import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { workoutFormSlice } from "../../store/slices/WorkoutFormSlice";

export const InformationTable = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.workoutForm.error);
    const message = useAppSelector(state => state.workoutForm.message);
    const hideMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(workoutFormSlice.actions.clearMessage());
    }
    const hideError = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log("I was ckucjed");
        dispatch(workoutFormSlice.actions.setError(""));
    }

// hide error and message on click
    return <div>
        {message && (()=>{return <div  className="infoMessage">
            Message: {message}  <button onClick={hideMessage}>X</button>
        </div>})()}

        {error && (() => {
            return <div className="errorMessage">
                Error: {error} <button onClick={hideError} >X</button>      
            </div>
        })()}
    </div>
}