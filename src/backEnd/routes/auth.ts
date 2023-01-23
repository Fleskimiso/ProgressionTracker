import Express from "express";
import {ILoginRequest, ISignupRequest} from "../../common/responseTypes/auth"
import { UserModel } from "../models/UserModel";
import passport from "passport"

//** move this to type definitions */
import { SessionData } from "express-session"

declare module "express-session" {
    interface SessionData {
        user: { [key: string]: any }
        pers: string
    }
}


export const Authrouter = Express.Router({mergeParams: true});

Authrouter.post("/login",passport.authenticate("local", {
  failureRedirect: "/login"  ,
  keepSessionInfo: true,
}),
 (req: Express.Request<{},{},ILoginRequest>,res) =>{
    res.status(200).send();
});
Authrouter.post("/signup",async (req: Express.Request<{},{},ISignupRequest>,res) =>{
    if(req.body.email && req.body.nick && req.body.password){ //check if they exist
       const users = await UserModel.find({ email: req.body.email})
       if(users.length === 0) {
        const newUser = new UserModel({
            email: req.body.email,
            nick: req.body.nick,
            workouts: [],
            exercises: [],
        });
        const registerUser = UserModel.register(newUser,req.body.password);
        req.login(registerUser, (error) =>{
            if(error) {
                res.status(500).json({message: "Internal Server Error"});
            }
        })
        await newUser.save();
        console.log("Where user? ");
        
        console.log(await req.user)
        req.session.pers = "Should be saved"
        

        res.status(200).send();
       }else {
            res.status(409).json({
                message: "User with this email already exists."
            });
       }
    }
})