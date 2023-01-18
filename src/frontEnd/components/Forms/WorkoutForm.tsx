import axios from "axios"
import type { RootState } from "../../store/store"
import { useSelector, useDispatch } from "react-redux";
import { workoutFormSlice } from "../../store/slices/WorkoutFormSlice"
import React from "react"
import TimePicker, { TimePickerProps, TimePickerValue } from "react-time-picker";
// import timePicker from "react-time-picker"

export const WorkoutForm = () =>{

    
    const startTime = useSelector((state: RootState) => { return state.workoutForm.startTime});
    const onstartTimeChange = (e: TimePickerValue) =>{
        dispatch(workoutFormSlice.actions.changeStartTime(e.toString()))
    }

    const dispatch = useDispatch();


    return <div>
        <form action="">
            <div>
              <div>
              <label htmlFor="day">Workout Day</label>
                <input type="date" name="day" id="day" />
              </div>
               <div>
               <label htmlFor="startTime">Workout start Time</label>
                {/* <input value={startTime} type="time" name="startTime" id="startTime" /> */}
                <TimePicker onChange={onstartTimeChange} clearIcon={null} disableClock={true} clockIcon={null} locale="pl-pl" value={startTime}/>
               </div>
                <div>
                <label htmlFor="endTime">Workout end Time</label>
                <input type="time" name="endTime" id="endTime" />
                </div>

            </div>
        </form>
        <div>

            {/* here will be displayed added exercises  */}
        </div>
    </div>
}