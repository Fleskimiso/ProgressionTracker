import {Request, Response} from "express";
import {ISubmitExerciseNameRequest, IWorkoutRequest} from "../../common/responseTypes/workout";

export const postWorkout = (req: Request<{},{},IWorkoutRequest>,res: Response) =>{
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
  }
export const postExercise = (req: Request<{},{},ISubmitExerciseNameRequest>,res: Response) =>{
  //TODO
}