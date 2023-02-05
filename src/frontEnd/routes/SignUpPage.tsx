import * as React from "react";
import { SignUpForm } from "../components/Forms/SignUpForm";

export const SignUpPage = () =>{
    return <div className="mainContainer">
        <div className="title">Create a new account</div>
        <SignUpForm/>
    </div>
}