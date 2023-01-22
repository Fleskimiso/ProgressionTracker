import Express from "express";

export const Authrouter = Express.Router({mergeParams: true});

Authrouter.post("/login", (req,res) =>{
    //login the user    
    console.log(req.body.email);
    console.log(req.body.password);
    res.status(200).json({message: "logged in succesfully"})
})
Authrouter.post("signup", (req,res) =>{
    res.status(500).send();
})