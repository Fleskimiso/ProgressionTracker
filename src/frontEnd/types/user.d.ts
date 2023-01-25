interface IUser {
    email: string,
    _id: string,
    nick: string,
    explicitLogout?: boolean
}
export type User = IUser;