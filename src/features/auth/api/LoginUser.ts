import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {useAuthStore} from '../model/store';
import {LoginUserModel, SuccessLogin} from "../model/LoginUserModel.ts";

const loginUserFn = async (credentials: LoginUserModel): Promise<SuccessLogin> => {
    const response = await axios.post<SuccessLogin>('https://port-0-pawalertbackendteamgroup-m06zwfj8628a2164.sel4.cloudtype.app/api/nonMember/user/login', credentials);
    return response.data;
};

export const useLoginMutation = () => {
    const setToken = useAuthStore((state) => state.setToken);
    return useMutation({
        mutationFn: loginUserFn,
        onSuccess: (data) => {
            const token = data.data.token;
            setToken(token);
            localStorage.setItem('token', token); // 토큰 로컬에 저장
        },
    });
};