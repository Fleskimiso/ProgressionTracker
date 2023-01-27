import { Request, Response } from "express";
import { Types } from "mongoose";
import { Exercise, IModifiedWorkout, IWorkout } from "../../common/common";
import { IErrorResponse } from "../../common/responseTypes/auth";
import { ISubmitExerciseNameRequest, IWorkoutRequest, IWorkoutResponse } from "../../common/responseTypes/workout";
import { ExerciseModel } from "../models/ExerciseModel";
import { IUser, UserModel } from "../models/UserModel";
import { WorkoutModel } from "../models/WorkoutModel";

export const postWorkout = async (req: Request<{}, {}, IWorkoutRequest>, res: Response<IErrorResponse>) => {
  try {
    const user = await UserModel.findById(req.session.currentUser?._id);
    if (user) {
      //get user exercise list merge the type with object id type
      const userExercisesList = (await user.populate<{ exercises: (Exercise & Types.ObjectId)[] }>("exercises")).exercises
      //create a new workout 
      const newUserWorkout = new WorkoutModel();
      //set the data
      newUserWorkout.day = new Date(req.body.day);
      newUserWorkout.duration = req.body.duration;
      //standard exercises
      req.body.standardExercises.forEach(exercise => {
        for (let i = 0; i < userExercisesList.length; i++) {
          if (userExercisesList[i].name === exercise.name) {
            newUserWorkout.standardExercises.push({
              exercise: userExercisesList[i]._id,
              sets: exercise.sets
            });
            break; //break the loop
          }
        }
      })
      //izometric exercises
      req.body.izometricExercises.forEach(exercise => {
        for (let i = 0; i < userExercisesList.length; i++) {
          if (userExercisesList[i].name === exercise.name) {
            newUserWorkout.izometricExercises.push({
              exercise: userExercisesList[i],
              sets: exercise.sets
            });
            break; //break the loop
          }
        }
      })
      //save the workout
      await newUserWorkout.save();
      //add the workout to the user
      user.workouts.push(newUserWorkout._id);
      await user.save();
      res.status(200).json({
        message: "Workout added successfully"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
} //
export const getWorkouts = async (req: Request<{},{},{},{ limit ?: string, offset ?:string  }>, res: Response<IErrorResponse | IWorkoutResponse>) => {
  try {
    //find user 
    const userId = req.session.currentUser?._id;
    if (userId) { 
      //populate reference fields    
      let limit =0;
      let offset = 0;
      if(req.query.limit){
        limit = Number(req.query.limit)
      }
      if(req.query.offset){
        offset = Number(req.query.offset)
      }
      
      UserModel.findById(userId).lean();
      const populatedUserWorkouts = await UserModel.findById(userId).populate<{workouts: IModifiedWorkout[]}>({
        path: "workouts",
        options: {
          limit: limit,
          skip: offset
        },
        populate: [{
          path: "standardExercises",
          populate: {
            path: "exercise",
          }
        }, {
          path: "izometricExercises",
          populate: {
            path: "exercise",
          }
        }],
      });
      // send the workouts even if empty
      res.status(200).json({
        workouts: (populatedUserWorkouts !== null ? populatedUserWorkouts.workouts : [])
      });
    }
  } catch (error: any) {
    console.log(error.message);
    
    res.status(500).json({
      message: "Error happened while getting workouts"
    });

  }


}