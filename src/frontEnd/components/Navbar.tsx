import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { exerciseListSlice } from "../store/slices/ExerciseListSlice";
import { planSlice } from "../store/slices/PlanSlice";
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice";
import { logoutUserThunk } from "../store/thunks/logoutUserthunk";

export const Navbar = () => {

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [mobileLinkClass,setmobileLinkClass] = React.useState("navbar-item-hide")

    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(logoutUserThunk()).then(resp => {
            if (resp.meta.requestStatus === "fulfilled") {
                dispatch(workoutFormSlice.actions.clearWorkoutForm());
                dispatch(exerciseListSlice.actions.clear());
                dispatch(planSlice.actions.clearPlan())
                navigate("/");
                localStorage.clear();
            } else {
                if (typeof resp.payload === "string") {
                    dispatch(workoutFormSlice.actions.setError(resp.payload));
                }
            }
        }).catch((e: Error) => {
            dispatch(workoutFormSlice.actions.setError(e.message));
        });
    }
    const changeMobileClasses = (e: React.MouseEvent<HTMLDivElement>) =>{
        if(mobileLinkClass === "navbar-item-hide") {
            setmobileLinkClass("navbar-item-show");
        }else {
            setmobileLinkClass("navbar-item-hide");
        }
    }

    return <div className="navbar">
        
        <div className="navbarRow">
        <div className="mobileHamburger" onClick={changeMobileClasses} >
        <div className="pane"></div>
        <div className="pane"></div>
        <div className="pane"></div>
        </div>
        <Link className={`navbar-link navbar-item ${mobileLinkClass}`} to={"/"}>Homepage</Link>
        {user._id === "" &&
            <Link className={`navbar-link navbar-item ${mobileLinkClass}`} to={"/login"}>Login</Link>
        }
        {user._id === "" &&
            <Link className={`navbar-link navbar-item ${mobileLinkClass}`} to={"/signup"}>Sign Up</Link>
        }
        {user._id !== "" &&
            <Link className={`navbar-link navbar-item ${mobileLinkClass}`} to={"/workoutform"}>Add Workout</Link>
        }
        {user._id !== "" &&
            <Link className={`navbar-link navbar-item ${mobileLinkClass}`} to={"/workouts"}>Recent Workouts</Link>
        }
        {user._id !== "" &&
            <Link className={`navbar-link navbar-item ${mobileLinkClass}`} to={"/plans"}>Edit plans</Link>
        }
        {user._id !== "" &&
            <button className={`navbar-button navbar-item  ${mobileLinkClass}`}  onClick={logout}>Logout</button>
        }
        </div>
    </div>
}