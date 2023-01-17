import axios from "axios"
import React, { useState } from "react"
import TimePicker from "react-time-picker";
// import timePicker from "react-time-picker"

export const WorkoutForm = () =>{

    const [startTime, setstartTime] = useState("10:00");

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
                <TimePicker value={startTime}/>
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