import mongoose from "mongoose";
import { Exercise } from "../../common/common"
/**
 * An exercise model 
 * currently defined for two types of exercises 
 */
const ExerciseSchema = new mongoose.Schema<Exercise>({
    name: String,
    type: {
        type: String,
        enum: ["izometric", "standard"]
    }
})
ExerciseSchema.virtual("id").get(function() {
    return this._id.toString();
})

export const ExerciseModel =  mongoose.model<Exercise>("Exercise", ExerciseSchema);