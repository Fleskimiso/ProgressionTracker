//** move this to type definitions */
import { SessionData } from "express-session"
import { Types, Document } from 'mongoose';
import { IUser } from '../models/UserModel';

declare module "express-session" {
    interface SessionData {
        user: { [key: string]: any }
        currentUser: Document<unknown, any, IUser> & IUser & { _id: Types.ObjectId; } | undefined
        
    }
}