import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface IUser extends Express.User {
    email: string
    nick: string
    workouts: [
        mongoose.Types.ObjectId
    ],
    plan: mongoose.Types.ObjectId
    ,
    exercises: [
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
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan"
    },
    exercises: [{ 
        type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise"
    }]
})
UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

export const UserModel = mongoose.model<IUser>("User", UserSchema);