import axios from "axios";
import { useEffect, useState } from "react"
import * as React from "react"

export const Dummy = () =>{
    interface Resp {
        flag: string
    }
    const [res ,setres] = useState<Resp>({flag: ""});

    useEffect( () => {
       

       axios.get("http://localhost:3000/").then((response) =>{
            const resp = response.data as Resp
            setres(resp);
        });
    },[])

    return <div>
        {res.flag}
    </div>
}