export interface SignupUserModel {
    userName:string;
    email: string;
    password: string;
}

export interface SignupResponse {
    status: string;
    message: string;
    data: string;
}

