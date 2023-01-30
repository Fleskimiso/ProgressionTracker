import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPlan } from "../../common/common";
import { PlanDayCard } from "../components/PlanDayCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice";
import { editPlanThunk } from "../store/thunks/plan/editPlanThunk";
import { getPlanThunk } from "../store/thunks/plan/getPlanThunk";

//Edit plan page
export const PlanPage = () => {

    const exercises = useAppSelector(state => state.exerciseList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getPlanThunk()).then(resp => {
            if (resp.meta.requestStatus === "rejected") {
                if (typeof resp.payload === "string") {
                    dispatch(workoutFormSlice.actions.setError(resp.payload));
                }
            }else {
                if (resp.payload && typeof resp.payload !== "string") {
                    //destructuring the payload to modify the plan localy
                    setPlan(JSON.parse(JSON.stringify(resp.payload)));
                }
            }
        })
    },[]);

    const [plan, setPlan] = useState<IPlan>({
        currentDay: 1,
        workouts: [{
            day: 1,
            exercises: [{
                exercise: "",
                sets: 0,
            }]
        }]
    });
    const [currentW, setCurrentW] = useState<number>(0);
    const [currentSet, setCurrentSet] = useState(0);

    const changeDays = (e: React.ChangeEvent<HTMLInputElement>) => {
        const days = parseInt(e.target.value);
        let copyWorkouts = plan.workouts;
        //20 for performance check
        if (days <= copyWorkouts.length && days > 0) {
            copyWorkouts.length = days;
        } else if (days <= 20) {
            for (let i = copyWorkouts.length; i < days; i++) {
                copyWorkouts.push({
                    day: i + 1,
                    exercises: [{
                        exercise: exercises[0] ? exercises[0].name : "",
                        sets: 0,
                    }]
                });
            }
        }
        setPlan({
            currentDay: plan.currentDay,
            workouts: copyWorkouts
        });
    }
    const changeName = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        let copyWorkouts = plan.workouts;
        copyWorkouts[currentW].exercises[currentSet].exercise = name;
        setPlan({
            currentDay: plan.currentDay,
            workouts: copyWorkouts
        });
    }
    const changeSetsNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const setsNumber = parseInt(e.target.value);
        let copyWorkouts = plan.workouts;
        copyWorkouts[currentW].exercises[currentSet].sets = setsNumber;
        setPlan({
            currentDay: plan.currentDay,
            workouts: copyWorkouts
        });
    }
    const addSet = () => {
        let copyWorkouts = plan.workouts;
        copyWorkouts[currentW].exercises.push({
            exercise: "",
            sets: 0
        })
        setCurrentSet(copyWorkouts[currentW].exercises.length - 1);
        setPlan({
            currentDay: plan.currentDay,
            workouts: copyWorkouts
        });
    }
    const setPreviousSet = () => {
        if (currentSet > 0) {
            setCurrentSet(currentSet - 1)
        }
    }
    const setNextSet = () => {
        if (currentSet < plan.workouts[currentW].exercises.length - 1) {
            setCurrentSet(currentSet + 1)
        }
    }
    const setPreviousDay = () => {
        if (currentW > 0) {
            setCurrentW(currentW - 1)
            setCurrentSet(0);
        }
    }
    const setNextDay = () => {
        if (currentW < plan.workouts.length - 1) {
            setCurrentW(currentW + 1);
            setCurrentSet(0);
        }
    }
    const submitPlan = () => {
        dispatch(editPlanThunk(plan)).then(resp => {
            if (resp.meta.requestStatus === "fulfilled") {
                navigate("/")
            } else {
                if (typeof resp.payload === "string") {
                    dispatch(workoutFormSlice.actions.setError(resp.payload));
                }
            }
        })
    }

    return <div>
        Edit Your Workout Plan Here
        <div>
            <label htmlFor="days">For how many days: </label>
            <input type="number" id="days" value={plan.workouts.length} onChange={changeDays} />
        </div>

        <div>

            <div>
                <label htmlFor="name">Exercise Name: </label>
                <select onChange={changeName} value={plan.workouts[currentW].exercises[currentSet].exercise} id="name" >
                    {exercises.map(ex => <option key={ex.name} value={
                        ex.name
                    }>{ex.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="setsNumber">Sets: </label>
                <input value={plan.workouts[currentW].exercises[currentSet].sets} type="number" id="sets" onChange={changeSetsNumber} />
            </div>
            <button onClick={addSet}>Add Additional Set</button>
        </div>

        <div>
            <div> Current set (1-{plan.workouts[currentW].exercises.length}): {currentSet + 1} </div>
            <button onClick={setPreviousSet}>Previous Set</button>
            <button onClick={setNextSet}>Next Set</button>
        </div>

        <div>
            <div>Current day (1-{plan.workouts.length}): {currentW + 1} </div>
            <button onClick={setPreviousDay} >Previous Day</button>
            <button onClick={setNextDay} >Next Day</button>
        </div>
        <div>
            <div>Current Plan: </div>
            {plan.workouts.map(workout => {
                return <PlanDayCard key={workout.day} workoutDay={workout} />
            })}
        </div>
        <div>
            <button onClick={submitPlan}>Edit plan </button>
        </div>
    </div>
}