import axios from 'axios';
import { AnnouncementsResponse } from '../model/types';

export const getAnnouncements = async (page: number = 0, size: number = 9): Promise<AnnouncementsResponse> => {
    try {
        const token = localStorage.getItem('token'); // 토큰을 로컬 스토리지에서 가져옵니다.

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get<AnnouncementsResponse>
        (`${import.meta.env.VITE_APP_API_URL}/api/announcements/my-announcements`, {
            params: { page, size },
            headers: {
                'Authorization': `Bearer ${token}` // 토큰을 Authorization 헤더에 추가합니다.
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch announcements:', error);
        throw error;
    }
};