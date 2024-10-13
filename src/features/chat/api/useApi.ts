// src/features/user/api/userApi.ts
import { UserProfile } from "../model/types.ts";
import axios from "axios";

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('인증 토큰이 없습니다.');
    }

    const response = await axios.get<{ data: UserProfile }>(`${import.meta.env.VITE_APP_API_URL}/api/user/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data.data;
};