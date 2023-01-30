import React, { useState } from "react";
import { IPlan } from "../../common/common";
import { PlanDayCard } from "../components/PlanDayCard";
import { useAppSelector } from "../store/hooks";

//Edit plan page
export const PlanPage = () => {

    const exercises = useAppSelector(state => state.exerciseList)
    const [plan,setPlan] = useState<IPlan>( {
        currentDay: 1,
        workouts: []
    });
    const [currentW,setCurrentW] = useState<number>(plan.currentDay)
    const [currentSet, setCurrentSet] = useState(0);
    const [name,setName] = useState(0);
    const [setsNumber, setSetsNumber] = useState(0)

    const changeDays = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const days = parseInt(e.target.value);
        let copyWorkouts = plan.workouts;
        copyWorkouts;
        if(days <= copyWorkouts.length) {
            copyWorkouts.length = days;
        }else {
            for(let i=copyWorkouts.length; i<days; i++){
                copyWorkouts.push({
                    day: i,
                    exercises: []
                });
            }
        }
        setPlan({
            currentDay: plan.currentDay,
            workouts: copyWorkouts
        });
    }
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const name = e.target.value;
        let copyWorkouts = plan.workouts;
        copyWorkouts[currentW] = 
    }   

    return <div>
        Edit Your Workout Plan Here 
        <div>
            <label htmlFor="days">For how many days: </label>
            <input type="number" id="days" value={plan.workouts.length} onChange={changeDays}  />
        </div>

        <div>
            <div>Current Day: {currentW}</div>

            <div>
                <label htmlFor="name">Exercise Name: </label>
                <select onChange={changeName} value={exercises[0].name} id="name" >
                    {exercises.map(ex => <option key={ex.name} value={
                        ex.name
                    }>{ex.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="setsNumber">Sets: </label>
                <input type="number"  id="sets" onChange={changeSetsNumber} />
            </div>
             <button onClick={changeSet}>Change Set</button>       
            <button onClick={addSet}>Add Additional Set</button>
        </div>
        <div>
            <button onClick={}>Previous Set</button>
            <button>Next Set</button>
        </div>

        <div>
            <button>Previous Day</button>
            <button>Next Day</button>
        </div>
        <div>
            <div>Current Plan: </div>
            {plan.workouts.map(workout => {
                return <PlanDayCard key={workout.day} workoutDay={workout} />
            })}
        </div>
    </div>
}