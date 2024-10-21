import axios from 'axios';
import { AnnouncementsResponse } from '../model/types';

export const getMyAnnouncements = async (page: number = 0, size: number = 9): Promise<AnnouncementsResponse> => {
    try {
        const response = await axios.get<AnnouncementsResponse>(
            `${import.meta.env.VITE_APP_API_URL}/api/announcements/my-announcements`,
            // `http://localhost:8080/api/announcements/my-announcements`,
            {
                params: { page, size },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to fetch my announcements:', error);
        throw error;
    }
};