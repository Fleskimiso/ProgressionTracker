import * as React from "react"
import { Link } from "react-router-dom"

export const Navbar = () =>{
    return <div>
        <Link   to={"/"}>Homepage</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Sign Up</Link>
        <Link to={"/workout"}>Add Workout</Link>
        <Link to={"/plans"}>Edit plans</Link>
    </div>
}