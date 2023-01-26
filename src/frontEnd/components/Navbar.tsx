import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { exerciseListSlice } from "../store/slices/ExerciseListSlice";
import { userSlice } from "../store/slices/UserSlice";
import { workoutFormSlice } from "../store/slices/WorkoutFormSlice";
import { logoutUserThunk } from "../store/thunks/logoutUserthunk";

export const Navbar = () => {

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(logoutUserThunk()).then(resp => {
            if (resp.meta.requestStatus === "fulfilled") {
                dispatch(workoutFormSlice.actions.clearWorkoutForm());
                dispatch(exerciseListSlice.actions.clear());
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

    return <div>
        <Link to={"/"}>Homepage</Link>
        {user._id === "" &&
            <Link to={"/login"}>Login</Link>
        }
        {user._id === "" &&
            <Link to={"/signup"}>Sign Up</Link>
        }
        {user._id !== "" &&
            <Link to={"/workoutform"}>Add Workout</Link>
        }
        {user._id !== "" &&
            <Link to={"/workouts"}>Recent Workouts</Link>
        }
        {user._id !== "" &&
            <Link to={"/plans"}>Edit plans</Link>
        }
        {user._id !== "" &&
            <button onClick={logout}>Logout</button>
        }
    </div>
}