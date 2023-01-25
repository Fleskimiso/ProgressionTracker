import { RootState } from "../../store/store"
import { useSelector } from "react-redux";
import {  workoutFormSlice } from "../../store/slices/WorkoutFormSlice"
import React, { useEffect, useRef, useState } from "react"
import TimePicker, { TimePickerValue } from "react-time-picker";
import { ExerciseList } from "../ExerciseList";
import { IzometricExerciseInput } from "./inputForms/IzometricExerciseInput";
import { StandardExerciseInput } from "./inputForms/StandardExerciseInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { submitWorkoutThunk } from "../../store/thunks/workout/submitWorkoutThunk";
import { getExercisesThunk } from "../../store/thunks/workout/getExercisesThunk";
import { WorkoutFormState } from "../../types/workoutForm";
// import timePicker from "react-time-picker"

export const WorkoutForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMounted = useRef(false); // set to true on production or just delete 
    /*
    *   Display Any errors that happened during making a form
    */
    //get the whole workout and cache on change to localStorage
    const workout = useAppSelector(state => state.workoutForm);

    //start Time of the Workout 
    const startTime = workout.startTime;
    //update it on change 
    const onstartTimeChange = (e: TimePickerValue) => {
        if( e!== null){
            dispatch(workoutFormSlice.actions.changeStartTime(e.toString()))
        }
    }
    //end time of the workout
    const endTime = workout.endTime;
    // update it on change
    const onendTimeChange = (e: TimePickerValue) => {
        if(e !== null){
            dispatch(workoutFormSlice.actions.changeEndTime(e.toString()))
        }
    }
    //day of the workout
    const day = workout.day;
    
    //update day on change
    const ondayChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        // console.log(e.target.value);
        dispatch(workoutFormSlice.actions.changeDay(new Date(e.target.value).getTime()));
    }
    //set formatted date for input 
    const setDayValueForInput = () =>{
        let x = new Date(day); // uses day from outer scope
        let y = (x.getMonth()+1)
        let month = "01";
        if (y<10) {
            month =  "0"+String(y)
        }
        return (x.getFullYear()+"-"+month+"-"+x.getDate());
    }
    // which input type show on display? 
    const [inputType,setinputType] = useState("")
    // handle the change
    const onInputTypeChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setinputType(e.target.value);
    }
    /**
     * dispatches `submitWorkout` action
     */
    const submitWorkout = () =>{
        console.log("clcliking");
        dispatch(submitWorkoutThunk()).then(resp =>{
            if(resp.meta.requestStatus === "fulfilled") {
                navigate("/")
            }
        });
    }
    //get all the exercises for the form
    useEffect(() =>{
        const localWorkoutDataString = localStorage.getItem("workoutFormData");
        if(localWorkoutDataString) {
            //get the cache,parse it , and set the workout Form data
            const localWorkoutData = JSON.parse(localWorkoutDataString) as WorkoutFormState;
            dispatch(workoutFormSlice.actions.setCacheWorkout(localWorkoutData));

            console.log("setted up the data: ");
            console.log(localWorkoutData);

        }
        dispatch(getExercisesThunk()).then(resp =>{
            if(resp.meta.requestStatus === "rejected") {
                if(typeof resp.payload === "string"){
                    dispatch(workoutFormSlice.actions.setError(resp.payload));
                }
            }
        });
    },[])
    useEffect(() =>{
        if(isMounted.current) {
            localStorage.setItem("workoutFormData",JSON.stringify(workout))
            return () =>{
                console.log("saving on unmount");
                localStorage.setItem("workoutFormData",JSON.stringify(workout))
            };            
        } else {
            isMounted.current = true;
        }
    }, [workout])

    //To do styling
    return <div>
        <form action="">
            <div>
                <div>
                    <label htmlFor="day">Workout Day</label>
                    <input onChange={ondayChange} value={setDayValueForInput()} type="date" name="day" id="day" />
                </div>
                <div>
                    <label htmlFor="startTime">Workout start Time</label>
                    {/* <input value={startTime} type="time" name="startTime" id="startTime" /> */}
                    <TimePicker onChange={onstartTimeChange} clearIcon={null}
                        disableClock={true} clockIcon={null} locale="pl-pl" value={startTime} />
                </div>
                <div>
                    <label htmlFor="endTime">Workout end Time</label>
                    <TimePicker onChange={onendTimeChange} clearIcon={null}
                        disableClock={true} clockIcon={null} locale="pl-pl" value={endTime} />
                </div>
                <fieldset>
                    <legend>Choose Exercise Type:</legend>
                    <label htmlFor="exerciseType1">Standard </label>
                    <input onChange={onInputTypeChange} value="standard" type="radio" name="exerciseType" id="exerciseType1" />
                    <label htmlFor="exerciseType2">Izometric</label>
                    <input onChange={onInputTypeChange} value="izometric" type="radio" name="exerciseType" id="exerciseType2" />
                </fieldset>
                { inputType === "standard" &&
                     <StandardExerciseInput exerciseType="standard"/>
                }
                { inputType === "izometric" &&
                       <IzometricExerciseInput exerciseType="izometric" />
                }
               

            </div>
        </form>
        <ExerciseList/>
            {/* here will be displayed added exercises  */}
        <button onClick={submitWorkout}>Submit Workout</button>
    </div>
}