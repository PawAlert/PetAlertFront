import axios from 'axios';
import {MissingPostDetailData, MissingReportData} from '../model/types';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`
    // baseURL: `http://localhost:8080/api`


});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const createMissingReport = async (data: MissingReportData): Promise<void> => {
    await api.post('/missing/create', data);
};

export const fetchMissingPostDetail = async (id: string): Promise<MissingPostDetailData> => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/missing/getdetail/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching missing post detail:', error);
        throw error;
    }
};