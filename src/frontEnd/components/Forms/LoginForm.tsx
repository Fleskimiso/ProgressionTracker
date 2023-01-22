import axios from "axios"
import React, {useState} from "react"

//to do validation
export const LoginForm = () => {

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
    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
           
        // //make a request 
        //     const response = await axios.post<ILoginResponse>("/api/login",  {
        //         email,
        //         password
        //     }, {method: "post"})
        // // to do auth logic 
        // // to do routing to home page
        // // to do validation
        //     if(response.status === 200){
        //         console.log(response.data.message)

        //     }
        const response = await axios.post(("/api/login"), {
            email,
            password
        });
        console.log(response);

    }

    // div for styling
    return <div>
        {/* login form */}
        <form onSubmit={onFormSubmit} action="/api/login" method="post">
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
            <button  type="submit">
                Submit
            </button>
        </form>
    </div>
}