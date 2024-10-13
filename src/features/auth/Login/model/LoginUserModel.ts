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
    // 필요한 다른 사용자 정보 필드
}

export interface LoginUserModel {

    email: string;
    password: string;
    autocomplete?: 'current-password' | 'new-password';

}