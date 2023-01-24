import * as React from "react";
import {createRoot} from "react-dom/client"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Provider } from "react-redux";

import {store } from "./store/store";


import { Navbar } from "./components/Navbar";
import { HomePage } from "./routes/HomePage";
import {LoginPage} from "./routes/LoginPage"
import { PlanPage } from "./routes/PlanPage";
import { SignUpPage } from "./routes/SignUpPage";
import { WorkoutPage } from "./routes/WorkoutPage";
import { InformationTable } from "./components/Forms/InformationTable";
 




//main app 
export const App = (): JSX.Element =>{
   

    return <div>
        <Provider store={store}>
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route  path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>} />
                <Route path="/workout" element={<WorkoutPage/>} />
                <Route path="/plans" element={<PlanPage/>} />
            </Routes>
            <InformationTable/>
        </BrowserRouter>
        </Provider>
       
        
    </div>
}
const domNode = document.querySelector("#root");
if(domNode) {
   const root = createRoot(domNode);
   root.render(<React.StrictMode>
    <App/>
    </React.StrictMode>)
}
