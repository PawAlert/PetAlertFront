export interface SuccessLogin {
    status: string;
    message: string;
    data :{
        token: string;
    }
}

export interface LoginUserModel {

    email: string;
    password: string;
    autocomplete?: 'current-password' | 'new-password';

}