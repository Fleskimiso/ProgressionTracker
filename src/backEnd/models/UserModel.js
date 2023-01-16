const mongoose= require("mongoose");

/**
 * User 
 */
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    nick: {
        type:String,
        required: true
    },
    workouts: {
        type: mongoose.Types.ObjectId,
        ref: "Workout"
    },
    plans: [{
        type: mongoose.Types.ObjectId,
        ref: "Plan"
    }]
})

module.exports = mongoose.Model("User", UserSchema);