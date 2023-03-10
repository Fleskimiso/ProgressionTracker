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
            } else {
                if (resp.payload && typeof resp.payload !== "string") {
                    //destructuring the payload to modify the plan localy
                    setPlan(JSON.parse(JSON.stringify(resp.payload)));
                }
            }
        })
    }, []);

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
        //data submiting validation 
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
    const naviagateToExercises = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        navigate("/exercises");
    }

    return <div>
        <div className="mainPlanContainer">
        <div className="singlePlanItem">Edit Your Workout Plan Here</div>
        <div className="singlePlanItem">
            <label htmlFor="days">For how many days: </label>
            <input className="planInput" type="number" id="days" value={plan.workouts.length} onChange={changeDays} />
        </div>

        <div className="planItemsContainer">
            <div className="singlePlanItem"><b> Current set (1-{plan.workouts[currentW].exercises.length}): {currentSet + 1}</b> </div>
            <div className="planButtonsContainer">
            <button className="planButton" onClick={setPreviousSet}>Previous Set</button>
            <button className="planButton" onClick={setNextSet}>Next Set</button>
            </div>
        </div>
        <div className="singlePlanItem">

            <div className="singlePlanItem">
                <label htmlFor="name">Exercise Name: </label>
                <select className="planInput" onChange={changeName} value={plan.workouts[currentW].exercises[currentSet].exercise} id="name" >
                    {exercises.map(ex => <option key={ex.name} value={
                        ex.name
                    }>{ex.name}</option>)}
                </select>
            </div>
            <div className="singlePlanItem">
                <label htmlFor="setsNumber">Sets: </label>
                <input className="planInput" value={plan.workouts[currentW].exercises[currentSet].sets} type="number" id="sets" onChange={changeSetsNumber} />
            </div>

        </div>
        <div className="singlePlanItem">
            <button className="planButton linkButton" onClick={naviagateToExercises}>Add name to list</button>
            <button className="planButton" onClick={addSet}>Add Additional Exercise</button>
        </div>


        <div className="planItemsContainer">
            <div className="singlePlanItem"><b>Current day (1-{plan.workouts.length}): {currentW + 1}</b> </div>
            <div className="planButtonsContainer">
            <button className="planButton" onClick={setPreviousDay} >Previous Day</button>
            <button className="planButton" onClick={setNextDay} >Next Day</button>
            </div>
        </div>
        <div className="multiplePlanItem">
            <div className="singlePlanItem"><b>Current Plan: </b></div>
            <div className="planDayList">
                {plan.workouts.map(workout => {
                    return <PlanDayCard key={workout.day} workoutDay={workout} />
                })}
            </div>
        </div>
        <div className="singlePlanItem">
            <button className="planButton" onClick={submitPlan}>Edit plan </button>
        </div>
    </div>
    <div className="shadowInfo">
        {/* Note: If you need to add new exercise do it from the "Add Workout" Form */}
    </div>
    </div>
}