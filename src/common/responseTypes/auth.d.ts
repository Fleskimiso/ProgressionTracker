export interface ILoginRequest {
    email: string,
    password: string
}
export interface ISignupRequest extends ILoginRequest {
    nick: string
}
export interface IErrorResponse { 
    message?: string
}
export interface ISignUpResponse {
    _id: string,
    nick: string,
    email: string
}