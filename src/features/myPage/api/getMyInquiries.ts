import axios from 'axios';
import { MyInquiriesResponse } from '../model/types';

export const getMyInquiries = async (page: number = 0, size: number = 10): Promise<MyInquiriesResponse> => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get<MyInquiriesResponse>
        (`${import.meta.env.VITE_APP_API_URL}/api/inquiries/admin`, {
            params: { page, size },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch inquiries:', error);
        throw error;
    }
};