import mongoose from "mongoose";

/**
 * Interface for Exercise Schema
 */
interface IExercise {
    name: string,
    type: "izometric" | "standard"
}

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