import React from "react";
import { useAppSelector } from "../../store/hooks";

export const InformationTable = () =>{
    const error = useAppSelector(state => state.workoutForm.error);
    const message = useAppSelector(state => state.workoutForm.message);
    return <div>
        <div>
                {message}
            </div>
            <div>
                {error }
            </div>
    </div>
}