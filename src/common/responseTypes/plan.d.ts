import { IPlan } from "../common";

export interface IGetPlanResponse {
    plan: IPlan
}
export interface IPutPlanRequest extends IGetPlanResponse {}