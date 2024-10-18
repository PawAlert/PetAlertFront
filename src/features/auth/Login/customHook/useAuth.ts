import { useAuthStore } from '../model/store.ts';
import { UserInfo } from '../model/LoginUserModel';
import {useQuery, useQueryClient, UseQueryOptions} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';
import { useNavigate } from 'react-router-dom';

const USER_PROFILE_QUERY_KEY = 'userProfile';

const fetchUserProfile = async (token: string): Promise<UserInfo> => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data;
};

export const useAuth = () => {
    const { token, setToken, clearAuth, isLoggedIn } = useAuthStore();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const logout = () => {
        clearAuth();
        localStorage.removeItem('token'); // 로컬 스토리지의 토큰 삭제
        queryClient.clear();  // 모든 쿼리 캐시를 정리
    };

    const { data: userInfo, isLoading: userInfoLoading, isError: userInfoError } = useQuery<UserInfo, AxiosError>({
        queryKey: [USER_PROFILE_QUERY_KEY, token],
        queryFn: () => fetchUserProfile(token!),
        enabled: !!token,
        retry: false,
        onError: (error: AxiosError) => {
            console.error('Failed to fetch user profile:', error);
            logout();
            navigate('/login');
        }
    } as UseQueryOptions<UserInfo, AxiosError>);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('token', newToken); // 로컬 스토리지에 토큰 저장
    };

    return {
        isLoggedIn: isLoggedIn(),
        userInfo,
        userInfoLoading,
        userInfoError,
        login,
        logout
    };
};