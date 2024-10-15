import axios from 'axios';
import { OfficialRegistrationDto } from '../model/types';

export const registerOfficial = async (data: OfficialRegistrationDto) => {
    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/official/register`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};