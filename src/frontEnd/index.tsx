import * as React from "react";
import {createRoot} from "react-dom/client"
import { Dummy } from "./components/dummy";
const App = (): JSX.Element =>{
    return <div>
        "Hello world from React and Typescript"
        <Dummy/>
    </div>
}
const domNode = document.querySelector("#root");
if(domNode) {
   const root = createRoot(domNode);
   root.render(<React.StrictMode><App/></React.StrictMode>)
}
