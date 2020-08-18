export interface IToken {
    value: string;
    validTo: string;
}

export interface IUserInfo {
    id: number;
    userName?: string;
    email?: string;
    isActive?: boolean;
    password?: any;
}

export interface IUser {
    token: IToken;
    userInfo: IUserInfo;
}
