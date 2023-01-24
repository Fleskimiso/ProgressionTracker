import axios from "axios"
import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { workoutFormSlice } from "../../store/slices/WorkoutFormSlice";
import { loginUserThunk } from "../../store/thunks/logInUserThunk";

//to do validation
export const LoginForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // email and password state
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    //handle on change
    const onemailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setemail(e.target.value)
    }
    const onpasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setpassword(e.target.value)
    }
    //form submit
    const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        // TODO email and password check...
        dispatch(loginUserThunk({email,password})).then(resp =>{
            if(resp.meta.requestStatus === "fulfilled"){
                navigate("/");
            }else{
                if(typeof resp.payload === "string"){
                dispatch(workoutFormSlice.actions.setError(resp.payload));
                }
            }
        }).catch((e: Error) =>{
                dispatch(workoutFormSlice.actions.setError(e.message));
        });
    }

    // div for styling
    return <div>
        {/* login form */}
        <form  action="/api/login" method="post">
            {/* email input  */}
            <div>
                <label htmlFor="email">Email: </label>
                <input value={email} type="email" id="email" name="email" onChange={onemailChange} />
            </div>
            {/* password input */}
            <div>   
                <label htmlFor="password">Password: </label>
                <input value={password} onChange={onpasswordChange} type="password" id="password" name="password" />
            </div>
            <button onClick={onFormSubmit} type="button">
                Submit
            </button>
            
        </form>
    </div>
}