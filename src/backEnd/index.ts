import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv"
import MongoDBConnect from "connect-mongo";
import cors from "cors";
import { IWorkoutRequest } from "../common/responseTypes/workout";
import {Authrouter} from "./routes/auth"

//import config values in deployment
const isDevelopment = process.env.NODE_ENV !== "production";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}


const app = express();
//set secret
const secret = process.env.SECRET as string;
const dbUrl = "mongodb://127.0.0.1:27017/progressiontracker"
//connect to db
mongoose.connect(dbUrl, function(error) {
  if(error){
    console.log(error);
    console.log("There has been an error");
  }else {
    console.log("succesfully connected to the database")
  }
})
//parse forms
app.use(express.urlencoded({extended: true}));
//parse json data
app.use(express.json());
//configure session store
const sessionStore = MongoDBConnect.create({
  mongoUrl: dbUrl,
  touchAfter: 5*3600, //5 days
  crypto: {
    secret: secret
  }
})

//configure the session 
const sessionConfig: session.SessionOptions = {
  secret: secret,
  saveUninitialized: true, //true for now change later to false
  store: sessionStore,
  resave: true, // save the session even if there are no changes
  cookie: {
    maxAge: 1000*3600*24*7*2, // two weeks for cookie to expire
    httpOnly: true,
    secure: isDevelopment ? false: true,
    sameSite: isDevelopment? "lax" : "strict",
  },
 
}

app.use(session(sessionConfig))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Headers",
   "Origin, Content-Type");
    next();
  });



app.use("/api", Authrouter);



app.get("/", (req,res) =>{
    //  const ste = new ExerciseModel()
    res.json({ flag: "Success"});
});
app.post("/api/workout", (req: Express.Request & {body: IWorkoutRequest},res) =>{
  //console.log(req.headers)
  console.log(req.body.day);
  console.log(req.body.duration);
  req.body.standardExercises.forEach(exercise =>{
    console.log(exercise.name);
    exercise.sets.forEach(set =>{
      console.log(set.repetitions);
    })
    
    
  })
  
  res.status(200).send();
})

app.listen(3000,() =>{
    console.log("listening on port 3000");
})