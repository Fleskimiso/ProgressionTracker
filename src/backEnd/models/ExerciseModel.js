const mongoose= require("mongoose");

/**
 * An exercise model 
 * currently defined for two types of exercises 
 */
const ExerciseSchema = new mongoose.Schema({
    name: String,
    type: {
        type: String,
        enum: ["izometric", "standard"]
    }
})

module.exports = mongoose.Model("Exercise", ExerciseSchema);