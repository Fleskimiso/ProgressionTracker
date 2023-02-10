import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice";
import { getUserLoginThunk } from "../store/thunks/getUserLoginThunk";
import { editPlanThunk } from "../store/thunks/plan/editPlanThunk";
import { getPlanThunk } from "../store/thunks/plan/getPlanThunk";
import { getExercisesThunk } from "../store/thunks/workout/getExercisesThunk";

export const HomePage = (): JSX.Element => {

    const dispatch = useAppDispatch()
    const explicitLogout = useAppSelector(state => state.user.explicitLogout);
    const user = useAppSelector(state => state.user.nick)
    const userPlan = useAppSelector(state => state.plan.plan)

    function doesHttpOnlySessionCookieExist(cookiename: string) {
        const d = new Date();
        d.setTime(d.getTime() + (1000));
        const expires = "expires=" + d.toUTCString();
      
        document.cookie = cookiename + "=new_value;path=/;" + expires;
        return document.cookie.indexOf(cookiename + '=') == -1;
      }

    //try to login user if the user didn't logout
    useEffect(() => {
        if (!explicitLogout && doesHttpOnlySessionCookieExist("connect.sid") ) {
            dispatch(getUserLoginThunk()).then(resp => {
                dispatch(getExercisesThunk());
                dispatch(getPlanThunk()).then(planResp => {
                    if (planResp.meta.requestStatus === "rejected" && typeof planResp.payload === "string") {
                        dispatch(workoutFormSlice.actions.setError(planResp.payload));
                    }
                })
            })
            //do not catch the error
            //do not naviagate anywhere
        }
    }, []);
    // Set the next workout Day: 
    const markAsCompleted = async  (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        //set to the next day
        let nextDay = userPlan.currentDay;
        if(userPlan.currentDay < userPlan.workouts.length) {
            nextDay++;
        }else {
            nextDay = 1;
        }
        dispatch(editPlanThunk({
            currentDay: nextDay,
            workouts: userPlan.workouts
        })).then(resp =>{
            if(resp.meta.requestStatus === "rejected"&& typeof resp.payload === "string") {
                workoutFormSlice.actions.setError(resp.payload)
            }
        })
    }


    if (user && user != "") {
        return <div className="mainContainer">
            
            <div className="singlePlanItem">Welcome back {user}</div>
            {/* <div> inline component, might move it out to different file  */}
                { userPlan.workouts.length > 0 && (()=>{
                    return <div className="">
                        <div className="singlePlanItem"> Your next ({userPlan.currentDay}) workout day should be:  </div>
                        <ol className="planList"> {userPlan.workouts[userPlan.currentDay-1].exercises.map(exercise =>{
                            return  <li key={exercise.exercise} className="planListItem"> Exercise: {exercise.exercise} x{exercise.sets} </li>
                        })} </ol>
                        <div className="buttonsContainer">
                            <button onClick={markAsCompleted} className="planButton">Mark as Completed</button>
                        </div>
                    </div>
                })() }
        </div>
    } else {
        return <div>
            <div>Create a new account to start</div>
            <div> tracking your workout progress</div>
        </div>
    }
}