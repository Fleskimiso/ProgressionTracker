import mongoose from "mongoose";
import { IExercise } from "../../common/common"
/**
 * An exercise model 
 * currently defined for two types of exercises 
 */
const ExerciseSchema = new mongoose.Schema<IExercise>({
    name: String,
    type: {
        type: String,
        enum: ["izometric", "standard"]
    }
})

export const ExerciseModel =  mongoose.model<IExercise>("Exercise", ExerciseSchema);