export interface ILoggedUser {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: any;
    localId: string;
}

export interface IUser {
    email: string;
    password: string;
};
