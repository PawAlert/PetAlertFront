export interface SuccessLogin {
    status: string;
    message: string;
    data :{
        token: string;
    }
}

export interface UserInfo {
    uid: string;
    email: string;
    userName: string;
    userRoles: string;
    // 다른 필요한 필드들...
}
export interface LoginUserModel {

    email: string;
    password: string;
    autocomplete?: 'current-password' | 'new-password';

}