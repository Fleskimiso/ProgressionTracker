const mongoose= require("mongoose");

/**
 * A Workout schedule 
 * contains list of exercises for a given day (1st, 2nd and so on)
 * 
 */
const PlanSchema = new mongoose.Schema({
    isActive: Boolean,
    currentDay: {
        type: Number,
        min: 1
    },
    workouts: [{
        day: {
            type: Number,
            min: 1
        },
        exercises: [{
            exercise: {
                type: mongoose.Types.ObjectId,
                ref: "Exercise"
            },
            sets: {
                type: Number,
                min: 1
            }
        }]
    }]
})

module.exports = mongoose.Model("Plan", PlanSchema);