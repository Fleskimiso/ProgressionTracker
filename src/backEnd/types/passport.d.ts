import { IUser } from "../models/UserModel";  // export interface User { _id: string, ... }

declare module 'passport' {
  interface Authenticator {
    serializeUser<TID>(fn: (user: IUser, done: (err: any, id?: TID) => void) => void): void;
  }
}
