import axios from "axios"
import React, { useState } from "react"

export const SignUpForm = () => {
    //email
    const [email, setemail] = useState("");
    // password
    const [password, setpassword] = useState("");
    // retyped password
    const [passwordRetyped, setpasswordRetyped] = useState("");
    // nick
    const [nick, setnick] = useState("");
    //on email change
    const onemailChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setemail(e.target.value)
    }
    //on password change
    const onpasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setpassword(e.target.value)
    }
    //on retyped password change
    const onpasswordRetypedChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setpasswordRetyped(e.target.value)
    }
    //on nick change
    const onnickChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setnick(e.target.value);
    }
    //on form Submit
    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        //make a request
        e.preventDefault();
        // to do input validation
        const response = await axios.post("/api/post", {
            email,
            password,
            passwordRetyped,
            nick
        })
        if(response.status === 200) {
            //if register do smoething
        }
    }

    return <div>
        <form onSubmit={onFormSubmit} action="/api/signup">
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

        </form>
    </div>
}