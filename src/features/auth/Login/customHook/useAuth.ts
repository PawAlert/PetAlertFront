import { useAuthStore } from '../model/store.ts';
import { UserInfo } from '../model/LoginUserModel';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// 쿼리 키를 상수로 정의
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

    const { data: userInfo, isLoading: userInfoLoading } = useQuery({
        queryKey: [USER_PROFILE_QUERY_KEY, token],
        queryFn: () => fetchUserProfile(token!),
        enabled: !!token,
    });

    const logout = () => {
        clearAuth();
        queryClient.clear();  // 모든 쿼리 캐시를 정리
    };

    return {
        isLoggedIn: isLoggedIn(),
        userInfo,
        userInfoLoading,
        login: (newToken: string) => {
            setToken(newToken);
        },
        logout
    };
};