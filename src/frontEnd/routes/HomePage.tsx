import React, {useEffect} from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { getUserLoginThunk } from "../store/thunks/getUserLoginThunk";

export const HomePage = (): JSX.Element =>{

    const dispatch = useAppDispatch()
    const explicitLogout = useAppSelector(state=> state.user.explicitLogout);

    //try to login user if the user didn't logout
    useEffect(() =>{
        if(!explicitLogout){
            dispatch(getUserLoginThunk()) 
            //do not catch the error
            //do not naviagate anywhere
        }
    },[])
    return <div>
        "This is home pagre"
    </div>
}