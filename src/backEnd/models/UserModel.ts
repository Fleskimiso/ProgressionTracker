import mongoose from "mongoose";

interface IUser {
    email: string
    nick: string
    workouts: [
        mongoose.Types.ObjectId
    ],
    plans: [
        mongoose.Types.ObjectId
    ]
}

/**
 * User 
 */
const UserSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    nick: {
        type:String,
        required: true
    },
    workouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    }],
    plans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan"
    }]
})

export const UserModel = mongoose.model<IUser>("User", UserSchema);