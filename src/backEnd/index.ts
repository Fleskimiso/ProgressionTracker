import express from "express";
import mongoose from "mongoose";
import { IWorkoutRequest } from "./types/WorkoutResponse";

// import {  } from "./models/WorkoutModel";
//  import {ExerciseModel }from "./models/ExerciseModel"
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/progressiontracker", function(error) {
  if(error){
    console.log(error);
    console.log("There has been an error");
  }else {
    console.log("succesfully connected to the database")
  }
})
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.get("/", (req,res) =>{
    //  const ste = new ExerciseModel()
    res.json({ flag: "Success"});
})
app.post("/api/login", (req,res) =>{
  console.log(req.body);
  res.status(200).json({
    message: "Hello from the backend"
  })
})
app.post("/api/workouts", (req: Express.Request & {body: IWorkoutRequest},res) =>{
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