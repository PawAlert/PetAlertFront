import axios from 'axios';
import { CreateNoticeRequest, CreateNoticeResponse } from '../model/noticesModel';

// const API_URL = 'http://localhost:8080/api';
const API_URL = `${import.meta.env.VITE_APP_API_URL}`;

export const createNotice = async (notice: CreateNoticeRequest): Promise<CreateNoticeResponse> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('인증 토큰이 없습니다.');
    }

    const response = await axios.post<CreateNoticeResponse>(
        `${API_URL}/notices/register`,
        notice,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};