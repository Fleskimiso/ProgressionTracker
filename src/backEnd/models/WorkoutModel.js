const mongoose= require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    startTime: Date,
    endTime: Date,
    izometricsExercises: [
        {
            exercise: {
                type: mongoose.Types.ObjectId,
                ref: "Exercise"
            },
            additionalWeight: {
                type: Number,
                min: 0
            },
            sets: [{
                holdTime: [{
                    type: Number,
                    min: 0
                }]
            }]
        }
    ],
    standardExercises: [{
        exercise: {
            type: mongoose.Types.ObjectId,
            ref: "Exercise"
        },
        additionalWeight: {
            type: Number,
            min: 0
        },
        sets: [{
            repetitions: {
                type: Number,
                min: 0
            }
        }]
    }]
})

module.exports = mongoose.Model("Workout", WorkoutSchema);