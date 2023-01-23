//** move this to type definitions */
import { SessionData } from "express-session"

declare module "express-session" {
    interface SessionData {
        user: { [key: string]: any }
        pers: string
    }
}