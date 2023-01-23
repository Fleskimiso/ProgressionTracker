import Express from "express";
import {ILoginRequest} from "../../common/responseTypes/auth"
import passport from "passport"
import { signup } from "../controllers/auth";




export const Authrouter = Express.Router({mergeParams: true});

Authrouter.post("/login",passport.authenticate("local", {
  keepSessionInfo: true,
}),
 (req: Express.Request<{},{},ILoginRequest>,res) =>{
    res.status(200).send();
});
Authrouter.post("/signup",signup);