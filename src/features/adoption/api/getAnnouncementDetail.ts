import axios from 'axios';
import { AnnouncementDetail } from '../model/types';

export const getAnnouncementDetail = async (id: number): Promise<AnnouncementDetail> => {
    try {
        const response = await axios.get<{ status: string; message: string; data: AnnouncementDetail }>(
            `${import.meta.env.VITE_APP_API_URL}/api/announcements/${id}`
        );
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch announcement detail:', error);
        throw error;
    }
};