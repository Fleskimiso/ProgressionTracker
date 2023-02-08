import { NextFunction, Request, Response } from "express";
import mongoose, { ObjectId, Types } from "mongoose";
import { Exercise, IModifiedWorkout, IWorkout } from "../../common/common";
import { IErrorResponse } from "../../common/responseTypes/auth";
import { IDeleteWorkoutRequest, ISubmitExerciseNameRequest, IWorkoutRequest, IWorkoutResponse } from "../../common/responseTypes/workout";
import { ExerciseModel } from "../models/ExerciseModel";
import { IUser, UserModel } from "../models/UserModel";
import { WorkoutModel } from "../models/WorkoutModel";
import { workoutFormSchema } from "../validators/workout";

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
          if (userExercisesList[i].name === exercise.exercise.name) {
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
          if (userExercisesList[i].name === exercise.exercise.name) {
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
export const getWorkouts = async (req: Request<{}, {}, {}, { limit?: string, offset?: string }>, res: Response<IErrorResponse | IWorkoutResponse>) => {
  try {
    //find user 
    const userId = req.session.currentUser?._id;
    if (userId) {
      //populate reference fields    
      let limit = 0;
      let offset = 0;
      if (req.query.limit) {
        limit = Number(req.query.limit)
      }
      if (req.query.offset) {
        offset = Number(req.query.offset)
      }
      const populatedUser = await UserModel.findById(userId).populate<{ workouts: IModifiedWorkout[] }>({
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
        workouts: (populatedUser !== null ? populatedUser.workouts : []),
      });
    }
  } catch (error: any) {
    console.log(error.message);

    res.status(500).json({
      message: "Error happened while getting workouts"
    });
  }
}

export const deleteWorkout = async (req: Request, res: Response<IErrorResponse>) => {
  try {
    const userId = req.session.currentUser?._id;
    if (userId) {
      const user = await UserModel.findById<IUser>(userId);
      // check if the workout is in user array
      //to prevent from deleting other users workouts
      const workoutId= req.params.id
      if (user && workoutId) {
        // if the user has the workout than delete
          if(user.workouts.includes(new mongoose.Types.ObjectId(workoutId))) {
            // pull from user subcollection
            await UserModel.findByIdAndUpdate(userId, {
              $pull: {
                workouts: workoutId
              }
            });
            //delete from workouts collection
            await WorkoutModel.deleteOne({
              _id: workoutId
            });
            //sent the success message
            res.status(200).json({
              message: "Workout deleted"
            });
          } else {
            //workout not found or the user is not authorized...
            res.status(404).json({
              message: "Workout not found"
            });
          }
      }

    }
  } catch(e) {
    res.status(500).json({message: "Internal server Error"});
  }
}

export const validateWorkout = (req: Request<{}, {}, IWorkoutRequest>, res: Response<IErrorResponse>, next: NextFunction) => {
  const { error } = workoutFormSchema.validate(req.body);
  if (!error) {
    return next();
  }
  res.status(400).json({ message: error?.message });
}