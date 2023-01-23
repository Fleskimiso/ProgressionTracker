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