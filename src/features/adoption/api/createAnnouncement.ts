import axios, { AxiosResponse } from 'axios';
import { CreateAnnouncementDto } from '../model/types';

export const createAnnouncement = async (announcementData: CreateAnnouncementDto) => {
    try {
        const response: AxiosResponse<CreateAnnouncementDto> = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/api/announcements/register`,
            announcementData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );


        return response.data;
    } catch (error) {
        console.error('Failed to create announcement:', error);
        throw error;
    }
};