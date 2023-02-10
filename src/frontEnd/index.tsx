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
import { WorkoutFormPage } from "./routes/WorkoutFormPage";
import { InformationTable } from "./components/Forms/InformationTable";
import { WorkoutsPage } from "./routes/WorkoutsPage";
import { WorkoutDetailsPage } from "./routes/WorkoutDetailsPage";
 
import "./assets/css/root.css"
import { ExercisePage } from "./routes/ExercisePage";




//main app 
export const App = (): JSX.Element =>{
   

    return <div className="app-react-root" >
        <Provider store={store}>
        <BrowserRouter>
        <Navbar/>
            <div className="mainContent">
            <Routes>
                <Route  path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>} />
                <Route path="/workoutform" element={<WorkoutFormPage/>} />
                <Route path="/plans" element={<PlanPage/>} />
                <Route path="/workouts" element={<WorkoutsPage/>} />
                <Route path="/workouts/:id" element={<WorkoutDetailsPage/>} />
                <Route path="/exercises" element={<ExercisePage/>} />
            </Routes>
            <InformationTable/>
            </div>
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
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker
        .register('sw.js')
        .then(function(registration) {
          console.log('[Service Worker] Registered');
          console.log(registration)
        })
        .catch(function(err) {
          console.log('[Service Worker] Registration failed: ', err);
        });
    });
  }
  
