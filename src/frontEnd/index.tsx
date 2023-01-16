import * as React from "react";
import {createRoot} from "react-dom/client"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { HomePage } from "./routes/HomePage";
import {LoginPage} from "./routes/LoginPage"
 


//main app 
const App = (): JSX.Element =>{
    return <div>
        "there should be navbar"
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
}
const domNode = document.querySelector("#root");
if(domNode) {
   const root = createRoot(domNode);
   root.render(<React.StrictMode>
    <App/>
    </React.StrictMode>)
}
