import axios from 'axios';
import {AnnouncementsResponse} from '../model/types';

export const getAnnouncements = async (page: number = 0, size: number = 9): Promise<AnnouncementsResponse> => {
    try {

        const response = await axios.get<AnnouncementsResponse>
        (`${import.meta.env.VITE_APP_API_URL}/api/announcements/get-announcements`, {
            params: {page, size},

        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch announcements:', error);
        throw error;
    }
};