import { useAuthStore } from '../model/store.ts';
import { UserInfo } from '../model/LoginUserModel';
import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

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

    const logout = () => {
        clearAuth();
        // 로컬 스토리지에서 필요한 키들을 모두 삭제
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        localStorage.removeItem('volunteer-search-store');
        queryClient.clear();  // 모든 쿼리 캐시를 정리
    };

    const { data: userInfo, isLoading: userInfoLoading, isError: userInfoError } = useQuery<UserInfo, AxiosError>({
        queryKey: [USER_PROFILE_QUERY_KEY, token],
        queryFn: () => fetchUserProfile(token!),
        enabled: !!token,
        retry: false,
        onError: (error: AxiosError) => {
            console.error('Failed to fetch user profile:', error);
            // 토큰이 유효하지 않은 경우 (401 Unauthorized) 또는 서버 에러 (500)의 경우
            if (error.response?.status === 401 || error.response?.status === 500) {
                logout();  // 로그아웃 처리 (로컬 스토리지 키 삭제 포함)
                // 사용자에게 알리지 않고 조용히 처리
            }
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