import * as React from "react";
import { WorkoutForm } from "../components/Forms/WorkoutForm";

export const WorkoutFormPage = () =>{


    return <div className="mainContainer">
        <div className="singleContentItem">
        <span>
        Your last workout
        </span>
        </div>
        <WorkoutForm />
    </div>
}