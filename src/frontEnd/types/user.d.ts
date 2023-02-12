interface IUser {
    email: string,
    _id: string,
    nick: string,
    explicitLogout?: boolean
    wLength?: number
}
export type User = IUser;