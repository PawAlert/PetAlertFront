import axios from 'axios';
import { MissingPostDetailData, MissingReportData } from '../model/types';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
});

export const createMissingReport = async (data: MissingReportData): Promise<void> => {
    const token = localStorage.getItem('token');
    await api.post('/missing/create', data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
};

export const fetchMissingPostDetail = async (id: string): Promise<MissingPostDetailData> => {
    try {
        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/missing/getdetail/${id}`, {
            headers
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching missing post detail:', error);
        throw error;
    }
};