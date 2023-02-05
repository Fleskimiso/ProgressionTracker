import * as React from "react";
import { LoginForm } from "../components/Forms/LoginForm";

export const LoginPage = (): JSX.Element =>{
    return <div className="mainContainer">
        <div className="title">Login</div>
        <LoginForm />
    </div>
}