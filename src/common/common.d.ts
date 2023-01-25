import { Types } from "mongoose"
/**
 * Interface for Exercise Schema
 */
interface IExercise {
    id?: string  
    name: string,
    type: "izometric" | "standard"
}
/**
 *  @param _id id of exercise optional
 * @param name name of exercise
 * @param type "izometric" | "standard"
 */
export type Exercise = IExercise;