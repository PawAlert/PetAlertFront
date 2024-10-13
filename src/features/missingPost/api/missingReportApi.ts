import axios from 'axios';
import {MissingReportData} from '../model/types';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}/api`


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
