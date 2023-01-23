import axios from "axios"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { workoutFormSlice } from "../../store/slices/WorkoutFormSlice";
import {IErrorResponse} from "../../../common/responseTypes/auth"
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector((state) => { return state.workoutForm.error });
    //email
    const [email, setemail] = useState("");
    // password
    const [password, setpassword] = useState("");
    // retyped password
    const [passwordRetyped, setpasswordRetyped] = useState("");
    // nick
    const [nick, setnick] = useState("");
    //on email change
    const onemailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setemail(e.target.value)
    }
    //on password change
    const onpasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpassword(e.target.value)
    }
    //on retyped password change
    const onpasswordRetypedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpasswordRetyped(e.target.value)
    }
    //on nick change
    const onnickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setnick(e.target.value);
    }
    //on form Submit
    const onFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (password === passwordRetyped) {
            const response = await axios.post<IErrorResponse>("/api/signup", {
                email,
                password,
                nick
            }, {method: "post"}); 
            if (response.status === 200) {
                console.log("registered user  succesfully");
                
            }else {
                const errorMessage = response.data.message !== undefined ? response.data.message : "";
                dispatch(workoutFormSlice.actions.setError(response.status + errorMessage));
            }
        } else {
            //dispatch an error
            dispatch(workoutFormSlice.actions.setError("Passwords should be equal"))
        }

        
    }

    return <div>
        <form action="/api/signup">
            <div>
                <label htmlFor="nick">Nick: </label>
                <input value={nick} onChange={onnickChange} type="nick" name="nick" id="nick" />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input value={email} onChange={onemailChange} type="email" name="email" id="email" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input value={password} onChange={onpasswordChange} type="password" name="password" id="password" />
            </div>
            <div>
                <label htmlFor="passwordRetyped">Re-enter your password: </label>
                <input value={passwordRetyped} onChange={onpasswordRetypedChange}
                    type="passwordRetyped" name="passwordRetyped" id="passwordRetyped" />
            </div>
            <button type="button" onClick={onFormSubmit}>
                Submit
            </button>
            <div>
                {error}
            </div>
        </form>
    </div>
}